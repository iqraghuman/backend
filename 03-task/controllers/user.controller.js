import User from "../models/User.model.js";

const registerUser = async (req,res) => {
    const {userName, userEmail, userPassword} = req.body;

    if(!userName || !userEmail || !userPassword) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const user = await User.create({username, useremail, userpassword})

        if(!user) {
            return res.status(500).json({message: "User not created"});
        }

        return res.status(200).json({
            message: "User created successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({message: "User not created", error});
    }
}

export { registerUser }