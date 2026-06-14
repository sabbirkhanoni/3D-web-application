import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed", "cancel"],
      default: "pending",
    },

    paymentMethod: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);