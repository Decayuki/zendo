import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        stripePaymentIntentId: {
            type: String,
            unique: true,
        },

        amount: { type: Number, required: true },

        status: {
            type: String,
            enum: ["succeeded", "refunded", "failed"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
