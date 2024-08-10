// index.js
import 'dotenv/config';  // This automatically loads the .env file
import connectDB from "./src/db/index.js";  // Use the correct relative path
import { app } from './src/app.js';
connectDB()
.then(()=>{app.listen(process.env.PORT || 8000,()=>{console.log(`running on ${PORT}`)})})
.catch((e)=>{console.log(e);
})