import express from 'express';
import { connectDB } from './src/db/mongo-db-connect.js';
import cors from 'cors';
import compression from 'compression';
import Router from './src/routes/routes.js';

const PORT = process.env.PORT || 8121;
const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => {
  console.log('✅ Database connection established');
  app.use('/api', Router);
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Database connection failed:', err);
});
