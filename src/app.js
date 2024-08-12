//app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))   //urlencoded encode the url which app get by the pagesextendend says that allows to more to more objects inside the objects
app.use(express.static("public")) 
app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_URL,
    credentials:true
}))

//import route
import userRouter from "./routes/user.routes.js"

//route declare
app.use("/api", userRouter);    

export {app}
