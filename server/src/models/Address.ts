import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
            default: null,
        },
        addressType: {
            type: String,
            enum: ["billing", "shipping"],
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: { type: String, required: true },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("Address", AddressSchema);
