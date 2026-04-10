import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/connectdb.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import taskRouter from "./routes/task.route.js"

import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);



dotenv.config()
const app = express()

const PORT = process.env.PORT

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

app.listen(PORT, () => {
    console.log("✌️Server is Running");
})