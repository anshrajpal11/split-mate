import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groupExpenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  settlements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Settlement" }],
});

const groupModel = mongoose.model("Group", groupSchema);
export default groupModel;
