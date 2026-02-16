import mongoose from "mongoose";

const RefundSchema = new mongoose.Schema(
    {
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: true,
        },
        stripeRefundId: { type: String },
        amount: { type: Number, required: true },
        reason: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Refund", RefundSchema);
