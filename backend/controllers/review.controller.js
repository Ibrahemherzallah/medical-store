import Review from "../models/review.model.js";
import User from "../models/user.model.js";

// Create a review
export const createReview = async (req, res) => {
    try {
        const { name, text:contentText, rating, city } = req.body;

        const review = new Review({
            name,
            contentText,
            rating,
            city
        });

        await review.save();
        res.status(201).json({ message: "تمت اضافة التقييم بنجاح", review });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ في اضافة التقييم", error: error.message });
    }
};

// Approve or disapprove review (admin only)
export const approveReview = async (req, res) => {
    try {
        const { id } = req.params;

        // Find review first
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "التقييم غير موجود" });

        // Toggle approved
        review.approved = !review.approved;
        await review.save();

        res.json({ message: "تم تحديث حالة التقييم", review });
    } catch (error) {
        res.status(500).json({ message: "خطأ في تحديث التقييم", error: error.message });
    }
};

// Get all approved reviews
export const getApprovedReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ approved: true });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "خطأ في استعادة التقرير", error: error.message });
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
}
