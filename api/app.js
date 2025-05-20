import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./db.js"
import { imageRouter } from "./routes/items.route.js"



const app = express()




const PORT = process.env.PORT || 3000

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL ,"http://localhost:5173"]  ,
    credentials: true
}));

// connects to mongoDB
connectDB()

app.use("/api",imageRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on  http://localhost:${PORT}`)
})
