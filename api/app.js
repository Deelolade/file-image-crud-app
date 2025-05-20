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
const allowedOrigins= [process.env.FRONTEND_URL ,"http://localhost:5173"]
app.use(cors({
    origin: allowedOrigins  ,
    credentials: true
}));

app.use("/api",imageRouter)

// Serve static frontend
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));


app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ error: "Internal Server Error" });
});

// connects to mongoDB
connectDB()




app.listen(PORT, ()=>{
    console.log(`server is running on  http://localhost:${PORT}`)
})
