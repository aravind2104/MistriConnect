import User from "../models/user.model";
import Handyman from "";
import Booking from "";

//add service
export const addService = async(req,res)=>{
    try {
        const { serviceType ,HandymanId } = req.body;
        if(!serviceType) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Find handymen 
        const handyman = await Handyman.findById(HandymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }
        // Check if the service type already exists
        const serviceExists = handyman.serviceType.some((service) => service.serviceType === serviceType);
        if (serviceExists) {
            return res.status(400).json({ message: "Service type already exists" });
        }
        // Add the new service type
        handyman.serviceType.push({ serviceType });
        await handyman.save();
        res.status(200).json({ message: "Service type added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//delete service
export const deleteService = async(req,res)=>{
    try {
        const { serviceType ,HandymanId } = req.body;
        if(!serviceType) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Find handymen 
        const handyman = await Handyman.findById(HandymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }
        // Check if the service type already exists
        const serviceExists = handyman.serviceType.some((service) => service.serviceType === serviceType);
        if (!serviceExists) {
            return res.status(400).json({ message: "Service type does not exist" });
        }
        // Add the new service type
        handyman.serviceType.pull({ serviceType });
        await handyman.save();
        res.status(200).json({ message: "Service type deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//update availability
export const updateAvailability = async(req,res)=>{
    try {
        const { date ,slot, HandymanId } = req.body;
        if(!date || !slot) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Find handymen 
        const handyman = await Handyman.findById(HandymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }

        const bookedExists = handyman.booked.some((booked) => booked.date === date && booked.slot === slot);
        if (bookedExists) {
            return res.status(400).json({ message: "Slot Already booked" });
        }

        handyman.booked.push({ date ,slot});
        await handyman.save();
        res.status(200).json({ message: "Availability updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//view bookings
export const viewBookings = async(req,res)=>{
    try {
        const { HandymanId } = req.body;
        if(!HandymanId) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Find handymen 
        const handyman = await Handyman.findById(HandymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }
        const bookings = await Booking.find({ handymanId: HandymanId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//accept or reject booking
export const acceptRejectBooking = async(req,res)=>{
    try {
        const { bookingId ,status } = req.body;
        if(!bookingId || !status) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Find handymen 
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({ message: "Booking status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

