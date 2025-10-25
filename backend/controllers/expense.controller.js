import expenseModel from "../models/expense.model.js";
import userModel from "../models/user.model.js";
import groupModel from "../models/group.model.js";

export const addExpense = async (req, res) => {
  try {
    const { expenseName, expenseDate, paidBy, amount } = req.body;
    const groupId = req.params.id;

    const group = await groupModel.findById(groupId);
    if (!group)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });

    const user = await userModel.findOne({ username: paidBy });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Create expense
    const expense = new expenseModel({
      expenseName,
      amount,
      expenseDate,
      paidBy: user._id,
      group: groupId,
    });
    await expense.save();

    // Add expense to user and group
    user.expenses = user.expenses || [];
    user.expenses.push(expense._id);
    await user.save();

    group.groupExpenses = group.groupExpenses || [];
    group.groupExpenses.push(expense._id);
    await group.save();

    const populated = await expense.populate([
      { path: "paidBy", select: "username email" },
    ]);
    return res.json({
      success: true,
      message: "Expense added successfully",
      expense: populated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await groupModel.findById(groupId).populate({
      path: "groupExpenses",
      populate: { path: "paidBy", select: "username email" },
    });
    if (!group)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });

    return res.json({
      success: true,
      expenses: group.groupExpenses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
