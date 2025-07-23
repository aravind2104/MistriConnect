import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, required: true },
    serviceType: { type: String, required: true },
    area: { type: String, required: true },
    price: { type: Number, required: true },
    availability: [{
        date: { type: String, required: true },  // Format: YYYY-MM-DD
        slot: { type: String, enum: ["forenoon", "afternoon"], required: true }
    }],


    earnings: [{
        month: String,  // Example: "March 2025"
        totalEarned: Number,
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
    }]
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
