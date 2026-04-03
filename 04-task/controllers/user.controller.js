import User from "../models/User.model.js";

const registerUser = async (req, res) => {
    const {userName, userEmail, userPassword} = req.body;

    // ✅ Pehle fields check karo
    if(!userName || !userEmail || !userPassword) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        // ✅ Check karo user pehle se exist toh nahi karta
        const existingUser = await User.findOne({ userEmail });

        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({userName, userEmail, userPassword});

        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({message: "User not created", error});
    }
}

const loginUser = async (req, res) => {
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        // ✅ Email AUR password dono se find karo
        const existingUser = await User.findOne({userEmail, userPassword});

        if(!existingUser) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        return res.status(200).json({
            message: "User logged in successfully",
            existingUser
        });

    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({message: "Login failed", error});
    }
}

// ✅ Ek saath export
export { registerUser, loginUser }