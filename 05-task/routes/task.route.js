
import { Router } from "express";
import isLoggedin from "../middlewares/isLoggedin.js";
import { createTask, getMyTasks, updateTask, deleteTask } from "../controllers/task.controller.js";

const taskRouter = Router()

taskRouter.post("/create-task", isLoggedin, createTask)
taskRouter.get("/my-tasks", isLoggedin, getMyTasks)
taskRouter.put("/update-task/:taskId", isLoggedin, updateTask)
taskRouter.delete("/delete-task/:taskId", isLoggedin, deleteTask);

export default taskRouter
