import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    description: String,
    date: Date,
    time: String,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    price: Number
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);
export default JobRequest;
