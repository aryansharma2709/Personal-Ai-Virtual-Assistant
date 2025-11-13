import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"


const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true
}))
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// Health check route
app.get("/", (req, res) => {
    res.json({ 
        message: "Virtual Assistant API is running",
        status: "ok",
        endpoints: {
            auth: "/api/auth",
            user: "/api/user"
        }
    })
})

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy" })
})

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})

