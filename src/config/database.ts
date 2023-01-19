import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose
            .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mu9kd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
        console.log("✅[database]: Database Connected Successfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB