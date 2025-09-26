import express from 'express';
import {getUsers, loginUser, registerUser} from "../controllers/user.controller.js";
import {admin, protect} from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", protect, admin ,getUsers);

export default router;