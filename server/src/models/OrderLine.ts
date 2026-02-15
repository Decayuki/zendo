import mongoose from "mongoose";

const OrderLineSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variation",
            required: true,
        },

        quantity: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("OrderLine", OrderLineSchema);
