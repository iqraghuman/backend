import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: [true, "user name is required"],
         unique: [true, "user name is unique"]
    },
    userEmail: {
        type: String,
        require: [true, "user email required"],
        unique: [true, "user email is unique"]
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    userPassword: {
        type: String,
        require: [true, "user password is required"],
         unique: [true, "user password is unique"]
    }
});

const User = mongoose.model("User", userSchema);
export default User;