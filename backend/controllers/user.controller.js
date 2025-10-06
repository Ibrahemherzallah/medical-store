import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { username, phone, secondPhone, email, password, address, city } = req.body;
        const existingUser = await User.findOne({ phone });
        if (existingUser) return res.status(400).json({ message: "رقم الهاتف موجود" });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword : " , hashedPassword)

        const user = new User({
            username,
            phone,
            secondPhone,
            email,
            address,
            city,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: "تم الانشاء بنجاح", user });
    } catch (error) {
        res.status(500).json({ message: "خطأ في انشاء حساب المستخدم", error: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "معلومات خاطئة" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "تم تسجيل الدخول بنجاح", token, user });
    } catch (error) {
        res.status(500).json({ message: "خطأ في تسجيل الدخول", error: error.message });
    }
};

// Get only normal users (exclude admins)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};
