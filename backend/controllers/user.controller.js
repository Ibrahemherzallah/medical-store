import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { name, phone, secondPhone, email, password } = req.body;

        const existingUser = await User.findOne({ phone });
        if (existingUser) return res.status(400).json({ message: "Phone already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            phone,
            secondPhone,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Get all users (admin only)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};
