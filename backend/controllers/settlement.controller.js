import expenseModel from "../models/expense.model.js";
import groupModel from "../models/group.model.js";
import userModel from "../models/user.model.js";
import settlementModel from "../models/settlement.model.js";

function computeNetBalances(members, expenses) {
  const userIdToNet = new Map();
  members.forEach((m) => userIdToNet.set(String(m._id), 0));

  const memberIds = members.map((m) => String(m._id));
  if (memberIds.length === 0) return userIdToNet;

  for (const exp of expenses) {
    const total = exp.amount || 0;
    const share = total / memberIds.length;
    const payerId = String(exp.paidBy._id || exp.paidBy);
    userIdToNet.set(payerId, (userIdToNet.get(payerId) || 0) + total);
    for (const uid of memberIds) {
      userIdToNet.set(uid, (userIdToNet.get(uid) || 0) - share);
    }
  }
  return userIdToNet;
}

function minimizeTransactions(userIdToNet) {
  const debtors = [];
  const creditors = [];
  for (const [uid, net] of userIdToNet.entries()) {
    const rounded = Math.round(net * 100) / 100;
    if (rounded > 0.01) creditors.push({ uid, amount: rounded });
    else if (rounded < -0.01) debtors.push({ uid, amount: -rounded });
  }
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const transfers = [];
  let i = 0,
    j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);
    transfers.push({
      payer: debtors[i].uid,
      payee: creditors[j].uid,
      amount: Math.round(pay * 100) / 100,
    });
    debtors[i].amount -= pay;
    creditors[j].amount -= pay;
    if (debtors[i].amount <= 0.01) i++;
    if (creditors[j].amount <= 0.01) j++;
  }
  return transfers;
}

export const computeSettlements = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await groupModel
      .findById(groupId)
      .populate({ path: "groupMembers", select: "username email" })
      .populate({ path: "groupExpenses", populate: { path: "paidBy" } })
      .populate({
        path: "settlements",
        populate: [
          { path: "payer", select: "_id username" },
          { path: "payee", select: "_id username" },
        ],
      });
    if (!group)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });

    const userIdToNet = computeNetBalances(
      group.groupMembers,
      group.groupExpenses
    );
    // Apply already settled transfers so they won't be considered again
    const settledTransfers = (group.settlements || []).filter(
      (s) => s.status === "settled"
    );
    for (const s of settledTransfers) {
      const payerId = String(s.payer?._id || s.payer);
      const payeeId = String(s.payee?._id || s.payee);
      const amt = s.amount || 0;
      if (userIdToNet.has(payeeId))
        userIdToNet.set(payeeId, (userIdToNet.get(payeeId) || 0) - amt);
      if (userIdToNet.has(payerId))
        userIdToNet.set(payerId, (userIdToNet.get(payerId) || 0) + amt);
    }

    const transfers = minimizeTransactions(userIdToNet);

    // Clear previous PENDING settlements; keep settled ones
    await settlementModel.deleteMany({
      group: groupId,
      status: { $ne: "settled" },
    });

    // Save new settlements
    const created = await settlementModel.insertMany(
      transfers.map((t) => ({
        group: groupId,
        payer: t.payer,
        payee: t.payee,
        amount: t.amount,
      }))
    );

    // Update references on group and users (append after existing settled)
    const newIds = created.map((s) => s._id);
    const existingSettledIds = (settledTransfers || []).map((s) => s._id);
    group.set({ settlements: [...existingSettledIds, ...newIds] });
    await group.save();

    // Optionally, attach settlements to users
    const userIds = Array.from(
      new Set(created.flatMap((s) => [String(s.payer), String(s.payee)]))
    );
    await userModel.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { settlements: { $each: newIds } } }
    );

    const populated = await settlementModel
      .find({ _id: { $in: [...existingSettledIds, ...newIds] } })
      .populate({ path: "payer", select: "username email" })
      .populate({ path: "payee", select: "username email" });

    return res.json({ success: true, settlements: populated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSettlements = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await groupModel.findById(groupId).populate({
      path: "settlements",
      populate: [
        { path: "payer", select: "username" },
        { path: "payee", select: "username" },
      ],
    });
    if (!group)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    return res.json({ success: true, settlements: group.settlements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const settleSettlement = async (req, res) => {
  try {
    const { id } = req.params; // settlement id
    const settlement = await settlementModel.findById(id);
    if (!settlement)
      return res
        .status(404)
        .json({ success: false, message: "Settlement not found" });

    if (settlement.status === "settled") {
      return res.json({
        success: true,
        message: "Already settled",
        settlement,
      });
    }

    settlement.status = "settled";
    settlement.settledAt = new Date();
    await settlement.save();

    const populated = await settlement.populate([
      { path: "payer", select: "username email" },
      { path: "payee", select: "username email" },
    ]);

    return res.json({
      success: true,
      message: "Settlement marked as settled",
      settlement: populated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
