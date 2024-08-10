// src/db/index.js
import mongoose from "mongoose";
import DB_NAME from "../constant.js";  // Use relative path

const connectDB = async () => {
    console.log("Attempting to connect to MongoDB...");  // Log before connection attempt
    try {
        // const connectionInstent = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        const connectionInstent = await mongoose.connect(`mongodb://0.0.0.0:27017/${DB_NAME}`)
        console.log("Connected to MongoDB:", connectionInstent.connection.host);  // Log success
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);  // Log error
        process.exit(1);
    }
}
export default connectDB;
