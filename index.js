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
  origin: process.env.FRONTEND_URL || 'https://emarket-frontend.vercel.app',  // Use environment variable or fallback
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Parse JSON requests
app.use("/api", router); // Register routes

// Optionally handle preflight requests
app.options('*', cors(corsOptions));  // Handle preflight requests

// In local development (not needed for Vercel)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 800;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
