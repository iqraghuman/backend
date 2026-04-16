import { Router } from "express"
import { getMe, loginUser, logout, registerUser, deleteUser } from "../controllers/user.controller.js"
import isLoggedin from "../middlewares/isLoggedin.js"
import authorizeRoles from "../middlewares/authorizeRoles.js"

const userRouter = Router()

userRouter.post("/register-user", registerUser)
userRouter.post("/login-user", loginUser)
userRouter.get("/get-me", isLoggedin, getMe)
userRouter.post("/logout-user", isLoggedin, logout)
userRouter.delete("/delete-user/:userId", isLoggedin,authorizeRoles("admin"), deleteUser)

export default userRouter