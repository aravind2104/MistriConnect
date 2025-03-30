import mongoose from 'mongoose';

const earningsSchema = new mongoose.Schema({
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
    month: String,  // Example: "March 2025"
    totalEarned: Number,
    jobs: [{
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRequest' },
        amount: Number
    }]
});

const Earnings = mongoose.model('Earnings', earningsSchema);
export default Earnings;
