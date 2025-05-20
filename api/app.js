import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./db.js"
import { imageRouter } from "./routes/items.route.js"
import path from "path";
import { fileURLToPath } from "url"; 


const app = express()
// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const PORT = process.env.PORT || 3000

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL ,"http://localhost:5173"]  ,
    credentials: true
}));

// Serve static frontend
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));


app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});


// connects to mongoDB
connectDB()

app.use("/api",imageRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on  http://localhost:${PORT}`)
})
