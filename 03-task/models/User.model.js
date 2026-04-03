import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "user name is required"]
    },
    useremail: {
        type: String,
        require: [true, "user email required"],
        unique: true
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    userpassword: {
        type: String,
        require: [true, "user password is required"]
    }
});

const User = mongoose.model("User", userSchema);
export default User;