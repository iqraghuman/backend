import mongoose from "mongoose";

const TaskSchema =new mongoose.Schema({
    tital: {
        type:String,
        require:[true, "title is required"]
    },
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       
    },
});

const Task= mongoose.model("Task", TaskSchema)

export default Task;