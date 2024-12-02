import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import router from "./routes/route.js";

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// CORS options
const corsOptions = {
  origin: 'https://setting-app-frontend.vercel.app', // Your React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Use the built-in express.json() to parse JSON requests
app.use("/", router); // Register your routes
app.get("/test",(req,res)=>{
  res.json({message:'route working'})
})
// Port from environment or default to 800
const port = process.env.PORT || 800;

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

export default app;