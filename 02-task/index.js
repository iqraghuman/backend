
import express from 'express';
import connectDB from './db/DB.js';

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

const PORT = 3000;

connectDB()
app.get("/first",(req,res)=>{
    res.send("hello this is my first api")
})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})