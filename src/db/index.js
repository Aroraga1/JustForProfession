import mongoose from "mongoose";
import DB_NAME from "../constant.js";  // Use relative path

const connectDB = async () => {
    try {
        const connectionInstent = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(connectionInstent);
    } catch (error) {
        console.log("mongoose disconnected");
        process.exit(1);        
    }
}
export default connectDB;
