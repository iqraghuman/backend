import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
const registerUser = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    // Validation
    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        });89
    }

    try {
        // Check existing user
        const existingUser = await User.findOne({ userEmail });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashPassword = bcrypt.hashSync(userPassword, 10);

        // Create user
        const user = await User.create({
            userName,
            userEmail,
            userPassword: hashPassword
        });

        // Remove password from response
    

        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "User not created",
            error: error.message
        });
    }
};



const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    // Validation
    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    try {
        // Find user
        const existingUser = await User.findOne({ userEmail });

        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isMatch = bcrypt.compareSync(
            userPassword,
            existingUser.userPassword
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Remove password
        const { userPassword: _, ...userData } = existingUser._doc;

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (https)
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: userData,
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

export { registerUser, loginUser };