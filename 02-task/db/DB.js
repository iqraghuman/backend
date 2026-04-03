import mongoose from "mongoose";

const connectdb = async () => {
    try {
       await mongoose.connect("mongodb+srv://arshadghuman555_db_user:I0kVr2vdz41vJ1oK@cluster0.s24ozt5.mongodb.net/")
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
export default connectdb;