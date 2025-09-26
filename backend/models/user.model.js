import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        secondPhone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            enum: ["الضفة الغربية", "الداخل", "القدس"],
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

