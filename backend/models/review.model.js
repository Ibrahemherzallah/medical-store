import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
          type: String,
          required: false
        },
        contentText: {
            type: String,
            required: true
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
