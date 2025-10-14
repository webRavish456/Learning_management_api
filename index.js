import express from 'express';
import { connectDB } from './src/db/mongo-db-connect.js';
import cors from 'cors';
import compression from 'compression';
import Router from './src/routes/routes.js'; // default import

const PORT = process.env.PORT || 8000;
const app = express();

// ===== Middleware =====
app.use(cors());
app.use(compression());
app.use(express.json()); // body parser for JSON
app.use(express.urlencoded({ extended: true })); // body parser for form data

// ===== Connect Database and Start Server =====
connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.use('/api', Router); // API routes
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
