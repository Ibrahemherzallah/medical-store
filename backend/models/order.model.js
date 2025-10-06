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
            enum: ["1-pill", "4-pills"],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        secondPhone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
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
        delivered: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
