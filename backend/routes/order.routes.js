import express from 'express';
import {createOrder, getOrders, updateOrderStatus} from "../controllers/order.controller.js";
import {admin, protect} from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/", createOrder);
router.put("/:id/status", updateOrderStatus);
router.get("/", protect, admin, getOrders);

export default router;