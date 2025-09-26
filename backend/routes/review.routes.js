import express from 'express';
import {admin, protect} from "../middleware/authMiddleware.js";
import {approveReview, createReview, getApprovedReviews, getReviews} from "../controllers/review.controller.js";
const router = express.Router();


router.post("/", createReview);
router.patch("/approve-review/:id", protect, admin, approveReview);
router.get("/get-approved-reviews", getApprovedReviews);
router.get("/",protect, admin, getReviews);

export default router;