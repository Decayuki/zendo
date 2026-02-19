import mongoose from "mongoose";

const VariationSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        color: { type: String },

        size: { type: String }, // size_clothe | size_shoes | ring_size

        stock: { type: Number, default: 0 },

    },
    { timestamps: true }
);

export default mongoose.model("Variation", VariationSchema);

