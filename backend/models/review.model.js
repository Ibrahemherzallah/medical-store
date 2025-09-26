import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        contentText: {
            type: String
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        approved: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
