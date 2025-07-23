import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    description: String,
    date: String, // Format: "YYYY-MM-DD"
    slot: { type: String, enum: ['forenoon', 'afternoon'], required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    price: Number,
    rating: { type: Number, min: 1, max: 5 }, // Optional rating field
    customerReview: { type: String } // Optional customer review field
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);
export default JobRequest;
