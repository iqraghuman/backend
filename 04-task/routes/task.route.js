import { Router } from "express"
import { isLoggedin } from "../middlewares/isLoggedin.js"
import { createTask } from "../controllers/task.controller.js"
import {getUserTaskCount, getTaskCountByUserId} from "../controllers/task.controller.js"



const taskRouter = Router()

taskRouter.get("/my-task-count", isLoggedin, getUserTaskCount);

taskRouter.post("/create-task", isLoggedin, createTask)

taskRouter.get("/my-task-count", getUserTaskCount);
taskRouter.get("/task-count/:userId", getTaskCountByUserId);

export default taskRouter