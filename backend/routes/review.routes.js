import express from 'express';
import {admin, protect} from "../middleware/authMiddleware.js";
import {approveReview, createReview, getApprovedReviews} from "../controllers/review.controller.js";
const router = express.Router();


router.post("/", createReview);
router.get("/", protect, admin, approveReview);
router.get("/", getApprovedReviews);

export default router;