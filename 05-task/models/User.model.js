import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is Required"]
    },
    userEmail: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    userPassword: {
        type: String,
        required: [true, "password is Required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

const User = mongoose.model("User", userSchema)
export default User