import { config } from "dotenv";
import mongoose from "mongoose";
config()
export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,)
        console.log("connected to mongoDB")
    } catch (error) {
        console.log("error connecting to mongoDB", error)
    }
}