import express from "express"
import dotenv from "dotenv"
import cors from "cors"
const app=express()
import connectDB from "./db.js"
import router from "./routes/route.js"
import bodyParser from "body-parser"
dotenv.config()
connectDB()
// for handling the json post put request
app.use(bodyParser.json());
const port=process.env.PORT||800
// app.use(cors())
app.use(cors({
    origin: 'https://emarket-frontend.vercel.app/'  // Replace with the actual URL of your frontend
  }));
app.use("/",router)
app.listen(port,()=>{
    console.log("Server is listening at http://localhost:",port);
    
})

