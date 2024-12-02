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
const corsOptions = {
  origin: 'https://setting-app-frontend.vercel.app', // Your React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Include cookies in requests if needed
};

app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(cors(corsOptions));
app.use(express.json());
app.use("/",router)
// app.listen(port,()=>{
//     console.log("Server is listening at http://localhost:",port);
    
// })

