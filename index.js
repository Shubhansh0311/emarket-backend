import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js'; // MongoDB connection
import router from './routes/route.js'; // Routes for your API

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// CORS options
const corsOptions = {
  origin: 'https://emarket-frontend.vercel.app',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow cookies or authentication headers
};

app.use(cors(corsOptions));  // Enable CORS with specific options
app.use(express.json());  // Built-in express.json() to parse JSON requests
app.use("/api", router);  // Register routes

// Handle preflight requests (OPTIONS method)
app.options('*', cors(corsOptions));

// Start the server
const port = process.env.PORT || 800;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
