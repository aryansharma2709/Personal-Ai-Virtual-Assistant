import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
        if (!process.env.MONGODB_URL) {
            console.error("❌ MONGODB_URL environment variable is not set")
            return
        }
        
        // Log connection info (without password for security)
        const urlObj = new URL(process.env.MONGODB_URL)
        const maskedUrl = `${urlObj.protocol}//${urlObj.username}:***@${urlObj.host}${urlObj.pathname}`
        console.log("🔌 Attempting to connect to MongoDB...")
        console.log("📍 Connection string:", maskedUrl)
        
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        })
        console.log("✅ Database connected successfully")
    } catch (error) {
        console.error("❌ Database connection failed:")
        if (error.code === 8000 || error.codeName === 'AtlasError') {
            console.error("🔐 Authentication failed. Please check:")
            console.error("   1. MongoDB username and password are correct")
            console.error("   2. Password is URL-encoded if it contains special characters")
            console.error("   3. Database user exists in MongoDB Atlas")
            console.error("   4. IP address is whitelisted in MongoDB Atlas Network Access")
            console.error("")
            console.error("💡 To fix this:")
            console.error("   - Go to MongoDB Atlas → Database Access")
            console.error("   - Reset your database user password")
            console.error("   - Update MONGODB_URL in Render with the new password")
            console.error("   - Make sure Network Access allows 0.0.0.0/0 (all IPs)")
        } else if (error.name === 'MongoServerSelectionError') {
            console.error("🌐 Network/Connection error. Please check:")
            console.error("   - IP address is whitelisted in MongoDB Atlas Network Access")
            console.error("   - MongoDB cluster is running")
        }
        console.error("Error details:", error.message)
        console.error("Error code:", error.code || error.codeName)
        // Don't exit process, let server start but log the error
    }
}

export default connectDb