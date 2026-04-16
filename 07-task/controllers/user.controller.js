import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const { fullName, userEmail, userPassword, confirmPassword } = req.body

    if (!fullName || !userEmail || !userPassword || !confirmPassword) {
        return res.status(400).json({
            message: "All Fields are required"
        })
    }

    try {

        const existingUser = await User.findOne({ userEmail })

        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        if (userPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password Must be Same"
            })
        }

        const hashPassword = bcrypt.hashSync(userPassword, 10)

        const newUser = await User.create({
            fullName,
            userEmail,
            userPassword: hashPassword
        })

        if (!newUser) {
            return res.status(500).json({
                message: "User is Not Created"
            })
        }

        return res.status(200).json({
            message: "User created Successfully",
            newUser
        })



    } catch (error) {
        return res.status(500).json({
            message: "Something went Wrong",
            error
        })
    }
}

const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body
    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "All Fields are required"
        })
    }

    try {

        const existingUser = await User.findOne({ userEmail })
        if (!existingUser) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        const isPasswordMatch = bcrypt.compareSync(userPassword, existingUser.userPassword)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign(
    { 
        userId: existingUser._id, 
        role: existingUser.role 
    }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
        );

        res.cookie(`${existingUser.role}Token`, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        

        return res.status(200).json({
            message: "Login Successfully",
            token
        })


    } catch (error) {
        return res.status(500).json({
            message: "Something went Wrong",
            error
        })
    }
}

const getMe = async (req, res) => {
    const userId = req.user.userId

    const checkUser = await User.findById(userId).select("-userPassword -__v")

    if (!checkUser) {
        return res.status(400).json({
            message: "user Not Found"
        })
    }

    return res.status(200).json({
        message: "User Found",
        checkUser
    })

}

export const logout = async (req, res) => {
    try {
        
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0), 
        });

        
        return res.status(200).json({
            message: "Logged out successfully. Token is now invalid."
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error during logout", 
            error: error.message 
        });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId

    try {
        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting user",
            error
        })
    }
}

export { registerUser, loginUser, getMe, deleteUser }