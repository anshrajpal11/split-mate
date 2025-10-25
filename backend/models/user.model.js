import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  settlements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Settlement" }],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
