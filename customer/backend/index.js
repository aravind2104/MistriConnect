import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectToMongodb.js';
import authRoutes from './routes/auth.routes.js';
import custRoutes from "./routes/cust.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173','http://localhost:5174','http://localhost:5175'], credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/customer", custRoutes);

app.listen(8001, () => console.log('Server running on port 8001'))