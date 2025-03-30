import mongoose from 'mongoose';

const HandymanSchema = new mongoose.Schema({
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
    serviceType:
        [{
            serviceType:{
            type:String,
            required:true,
            enum: ['Plumber', 'Electrician', 'Carpenter', 'Mason', 'Painter', 'Gardener']
        }
        }],
    Area:{
        type:String,
        required:true
    },
    booked: [{
        date: {
            type: Date,
            required: true
        },
        slot:{
            type: String,
            required: true,
            enum:['FN','AN']
        }
    }],
    rating: {
        type: Number,
        default: 0
    },
})
const Handyman = mongoose.model('Handyman', HandymanSchema);
export default Handyman;

