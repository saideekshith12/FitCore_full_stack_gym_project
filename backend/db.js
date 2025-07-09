import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Database is connected");
    } catch (error) {
        console.log("error in database connection", error)
        
    }
}

export default db