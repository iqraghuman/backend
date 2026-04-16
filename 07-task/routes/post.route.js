
import { Router } from "express";
import isLoggedin from "../middlewares/isLoggedin.js";
import { createPost,getAllPosts } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.post("/create-post", isLoggedin, createPost)
postRouter.get("/getAllPosts", isLoggedin, getAllPosts)
//postRouter.put("/update-task/:taskId", isLoggedin, updateTask)
//taskRouter.delete("/delete-task/:taskId", isLoggedin, deleteTask);

export default postRouter
