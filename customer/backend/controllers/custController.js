import User from "../models/user.model";
import Handyman from "";
import Booking from "";

//search service
export const searchServices = async(req,res)=>{
    try {
        const {serviceType, Area} = req.body;
        if(!serviceType || !Area) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Find handymen based on service type and area
        const handymen = await Handyman.find({
            serviceType: { $elemMatch: { serviceType: serviceType } },
            Area: Area
        });
        if (handymen.length === 0) {
            return res.status(404).json({ message: "No handymen found for the selected service type and area" });
        }
        res.status(200).json(handymen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//book service
export const bookService = async(req,res)=>{
    try {
        const { handymanId, userId, serviceType, Area, date ,slot} = req.body;
        if(!handymanId || !userId || !serviceType || !Area || !date ,!slot) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Check if the handyman is available for the selected date
        const handyman = await Handyman.findById(handymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }
        const notAvailable = handyman.booked.some((slot) => {
            const slotDate = new Date(slot.date);
            const slotTime = slot.slot;
            // Check if the slot is already booked
            if(slotDate.toDateString() === new Date(date).toDateString() && slotTime === slot) {
                return true;
            }
            return false;
        });
        if (notAvailable) {
            return res.status(400).json({ message: "Handyman is not available on the selected date" });
        }
        // Create a new booking
        const booking = new Booking({
            handymanId,
            userId,
            serviceType,
            Area,
            date,
            status: "Pending"
        });
        await booking.save();
        res.status(201).json({ message: "Booking request sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//view bookings
export const viewBookings = async(req,res)=>{
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({message:"Please provide user ID"});
        }
        const bookings = await Booking.find({ userId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//cancel booking
export const cancelBooking = async(req,res)=>{
    try {
        const { bookingId } = req.params;
        if(!bookingId) {
            return res.status(400).json({message:"Please provide booking ID"});
        }
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//leave rating
export const leaveRating = async(req,res)=>{
    try {
        const { bookingId, rating } = req.body;
        if(!bookingId || !rating ) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== "Completed") {
            return res.status(404).json({ message: "Booking not found or not completed" });
        }
        const handyman = await Handyman.findById(booking.handymanId);
        const Oldrating= handyman.rating;
        if(Oldrating==0){
            handyman.rating= rating;
        }
        else{
            handyman.rating= (Oldrating + rating) / 2;
        }
        await handyman.save();
        res.status(200).json({ message: "Rating submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//update profile
export const updateProfile = async(req,res)=>{
    try {
        const { userId, username, email, phoneNumber } = req.body;
        if(!userId || !username || !email || !phoneNumber) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        const user = await User.findByIdAndUpdate(userId, { username, email, phoneNumber }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}