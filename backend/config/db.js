import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL environment variable is not set")
            return
        }
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅ Database connected successfully")
    } catch (error) {
        console.error("❌ Database connection failed:")
        if (error.code === 8000 || error.codeName === 'AtlasError') {
            console.error("Authentication failed. Please check:")
            console.error("1. MongoDB username and password are correct")
            console.error("2. Password is URL-encoded if it contains special characters")
            console.error("3. Database user exists in MongoDB Atlas")
            console.error("4. IP address is whitelisted in MongoDB Atlas Network Access")
        }
        console.error("Error details:", error.message)
        // Don't exit process, let server start but log the error
    }
}

export default connectDb