import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  expenseName: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  expenseDate: { type: Date, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const expenseModel = mongoose.model("Expense", expenseSchema);
export default expenseModel;
