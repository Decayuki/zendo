// Shipping.model.ts
import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            unique: true,
            required: true,
        },
        carrierName: { type: String, default: "Mondial Relay" },
        trackingNumber: { type: String, unique: true },
        labelUrl: { type: String },
        pickupPointId: { type: String, required: true },
        pickupPointName: { type: String },
        pickupPointAddress: { type: String },
        status: {
            type: String,
            enum: [
                "pending",
                "label_generated",
                "shipped",
                "delivered",
                "received",
            ],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Shipping", ShippingSchema);
