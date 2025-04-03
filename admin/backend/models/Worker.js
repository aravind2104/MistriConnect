import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  skill: { type: String, required: true },
  bio: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  jobsCompleted: { type: Number, default: 0 }, // Added field for jobs completed
  revenueGenerated: { type: Number, default: 0 }, // Added field for earnings
});

const Worker = mongoose.model("Worker", WorkerSchema);
export default Worker;
