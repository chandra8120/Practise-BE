import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors()); // Invoke cors middleware to enable CORSs

// Parse JSON requests with a size limit of 30mb..
app.use(express.json({ limit: "30mb" }));

// Mount your router at the root path,
app.use('/', router);

mongoose.connect(process.env.MONGO_URL, { 
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error('MongoDB connection error:', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
