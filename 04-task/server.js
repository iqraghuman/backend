import express from "express";
import dotenv from "dotenv";
import connectdb from "./utils/connectdb.js";
import userRouter from './routes/user.route.js';
import cookieParser from "cookie-parser";

import dns from 'node:dns';
import taskRouter from "./routes/task.route.js";
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config()

const app = express()
const PORT = process.env.PORT
connectdb()
app.use(express.json());                          
app.use(cookieParser())




app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);


app.listen(PORT, ()=>{
    console.log('server is running');
})