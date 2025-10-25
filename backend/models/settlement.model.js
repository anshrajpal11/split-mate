import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "settled"], default: "pending" },
    settledAt: { type: Date },
  },
  { timestamps: true }
);

const settlementModel = mongoose.model("Settlement", settlementSchema);
export default settlementModel;
