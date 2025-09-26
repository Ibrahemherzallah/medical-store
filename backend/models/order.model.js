import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        package: {
            type: String,
            enum: ["1-pill", "3-pills"],
            required: true
        },
        packagePrice: {
            type: Number,
            required: true
        },
        deliveryRegion: {
            type: String,
            enum: ["الضفة الغربية", "الداخل", "القدس"],
            required: true,
        },
        deliveryPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
