import mongoose from "mongoose";
const workerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phoneNumber:{
        type:String,
        required:true
    },
    serviceType:{
        type:String,
        required:true
    },
    Area:{
        type:String,
        required:true
    },
    availability: {
        monday: [{ startTime: String, endTime: String }],
        tuesday: [{ startTime: String, endTime: String }],
        wednesday: [{ startTime: String, endTime: String }],
        thursday: [{ startTime: String, endTime: String }],
        friday: [{ startTime: String, endTime: String }],
        saturday: [{ startTime: String, endTime: String }],
        sunday: [{ startTime: String, endTime: String }]
    },
    earnings: [{
        month: String,  // Example: "March 2025"
        totalEarned: Number,
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
    }]
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;