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
        const handymen = await Handyman.find({ serviceType, Area});
        res.status(200).json(handymen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//book service
export const bookService = async(req,res)=>{
    try {
        const { handymanId, userId, serviceType, Area, date } = req.body;
        if(!handymanId || !userId || !serviceType || !Area || !date) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Check if the handyman is available for the selected date
        const handyman = await Handyman.findById(handymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }
        const notAvailable = handyman.booked.some((slot) => {
            const slotDate = new Date(slot.date);
            return slotDate.toDateString() === new Date(date).toDateString();
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

//leave review
export const leaveReview = async(req,res)=>{
    try {
        const { bookingId, rating, comment } = req.body;
        if(!bookingId || !rating || !comment) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.review = { rating, comment };
        await booking.save();
        res.status(200).json({ message: "Review submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}