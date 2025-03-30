import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    handymanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Handyman',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slot: {
        type: String,
        required: true,
        enum: ['FN', 'AN']
    },
    serviceType:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;