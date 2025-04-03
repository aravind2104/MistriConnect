import mongoose from "mongoose";
import bcrypt from "bcrypt";

const WorkerSchema = new mongoose.Schema({
      name: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, minlength: 6 },
      phoneNumber: { type: String, required: true },
      serviceType: { type: String, required: true },
      area: { type: String, required: true },
      status: { type: String, enum: ["active", "inactive"], default: "active"}, 
      availability: [{
          date: { type: String, required: true },  // Format: YYYY-MM-DD
          slot: { type: String, enum: ["forenoon", "afternoon"], required: true }
      }],
      price : { type: Number, required: true },
      earnings: { 
        type: [{ 
            month: String, 
            totalEarned: { type: Number, default: 0 }, 
            jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
        }],
        default: [] // Default empty earnings array
    }
});

// Method to compare password
WorkerSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Prevent password from being sent in responses
WorkerSchema.methods.toJSON = function () {
  const workerObject = this.toObject();
  delete workerObject.password;
  return workerObject;
};

const Worker = mongoose.model("Worker", WorkerSchema);
export default Worker;
