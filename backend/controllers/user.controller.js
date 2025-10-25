import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import expenseModel from "../models/expense.model.js";
import groupModel from "../models/group.model.js";
import settlementModel from "../models/settlement.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({
        message: "Please full all fields",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.json({
      success: true,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.json({
      error: error,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "Please full all fields",
        success: false,
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "User doesnt exist",
        success: false,
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.json({
        message: "incorrect password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, "secret key");
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({ success: true, message: "Logged out successfully" });
};

export const getUserSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // total spent by user across all expenses
    const totalSpentAgg = await expenseModel.aggregate([
      { $match: { paidBy: new userModel.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalSpent = totalSpentAgg?.[0]?.total || 0;

    // settlements where user pays (owe) and where user receives (toReceive)
    const [oweAgg, receiveAgg] = await Promise.all([
      settlementModel.aggregate([
        {
          $match: {
            payer: new userModel.Types.ObjectId(userId),
            status: { $ne: "settled" },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      settlementModel.aggregate([
        {
          $match: {
            payee: new userModel.Types.ObjectId(userId),
            status: { $ne: "settled" },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);
    const totalOwe = oweAgg?.[0]?.total || 0;
    const totalToReceive = receiveAgg?.[0]?.total || 0;

    // groups count and expenses count for context
    const [groupsCount, expensesCount] = await Promise.all([
      groupModel.countDocuments({
        $or: [{ groupOwner: userId }, { groupMembers: userId }],
      }),
      expenseModel.countDocuments({ paidBy: userId }),
    ]);

    return res.json({
      success: true,
      summary: {
        totalSpent,
        totalOwe,
        totalToReceive,
        net: totalToReceive - totalOwe,
        groupsCount,
        expensesCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
