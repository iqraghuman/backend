import express from 'express';

const app = express();

const PORT = 3000;
app.get("/first",(req,res)=>{
    res.send("hello this is my first api")
})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
