import mongoose from "mongoose";

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI)
            .then( () => {
                console.log("Connected to DB");
            })
            .catch((error) => {
                console.log(`connection error ${error}`)
            })
    } 
    catch (error) {
        console.log(`connection error ${error}`)
    }
}  


// ztHop4Fg5EHKq7xf
export default connectDB;
