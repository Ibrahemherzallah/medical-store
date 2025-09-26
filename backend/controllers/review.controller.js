import Review from "../models/review.model.js";

// Create a review
export const createReview = async (req, res) => {
    try {
        const { userId, contentText, rating } = req.body;

        const review = new Review({
            userId,
            contentText,
            rating,
        });

        await review.save();
        res.status(201).json({ message: "Review submitted successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Error creating review", error: error.message });
    }
};

// Approve review (admin only)
export const approveReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(
            id,
            { approved: true },
            { new: true }
        );

        if (!review) return res.status(404).json({ message: "Review not found" });

        res.json({ message: "Review approved", review });
    } catch (error) {
        res.status(500).json({ message: "Error approving review", error: error.message });
    }
};

// Get all approved reviews
export const getApprovedReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ approved: true }).populate("userId", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
};
