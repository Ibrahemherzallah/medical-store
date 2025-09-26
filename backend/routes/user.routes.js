import express from 'express';
import {getUsers, loginUser, registerUser} from "../controllers/user.controller.js";
const router = express.Router();


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

export default router;