import express from "express";
import dotenv from "dotenv";
import connectdb from "./utils/connectdb.js";
import userRouter from './routes/user.route.js';

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config()

const app = express()
const PORT = process.env.PORT
connectdb()
app.use(express.json());                          
app.use(express.urlencoded({ extended: true }));  




app.use("/api/v1/users", userRouter);

app.listen(PORT, ()=>{
    console.log('server is running');
})