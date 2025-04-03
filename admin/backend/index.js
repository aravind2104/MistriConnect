import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectToMongodb.js";
import authRoutes from "./routes/authRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import earningRoutes from "./routes/workerEarningsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"], credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/workers/earnings", earningRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
