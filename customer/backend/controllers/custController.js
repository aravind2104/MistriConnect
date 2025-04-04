import Worker from "../models/workerModel.js";
import JobRequest from "../models/jobRequestModel.js";
import User from "../models/user.model.js";
//search service
export const searchServices = async (req, res) => {
    console.log("Searching services...");
    console.log("Incoming query:", req.query); // Debugging

    try {
        const { serviceType, area } = req.query; // Ensure correct case

        if (!serviceType || !area) {
            return res.status(400).json({ message: "Please provide serviceType and area" });
        }

        console.log(`Searching for serviceType: ${serviceType}, area: ${area}`);

        const handymen = await Worker.find({ serviceType, area });

        console.log("Handymen found:", handymen);
        res.status(200).json(handymen);
    } catch (error) {
        console.error("Error fetching handymen:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



//book service
export const bookService = async(req,res)=>{
    try {
        const { WorkerId, description, Area, date , slot, price} = req.body;
        const userId = req.user._id;    
        if(!WorkerId || !userId || !description || !Area || !date || !slot || !price) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        // Check if the Worker is available for the selected date
        const worker = await Worker.findById(WorkerId);
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }
        const notAvailable = worker.availability.some((booking) => {
            const bookingDate = booking.date
            return bookingDate === date && booking.slot === slot;
        });
        if (notAvailable) {
            return res.status(400).json({ message: "worker is not available on the selected date" });
        }
        // Create a new JobRequest
        const jobreq = new JobRequest({
            customerId: userId,
            workerId: WorkerId,
            description,
            date,
            slot,
            status: "pending",
            price
        });
        await jobreq.save();
        res.status(201).json({ message: "JobRequest request sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//view JobRequests
export const viewBookings = async(req,res)=>{
    try {
        const  userId  = req.user._id;
        console.log(userId);
        if(!userId) {
            return res.status(400).json({message:"Please provide user ID"});
        }
        const JobRequests = await JobRequest.find({ customerId: userId });
        const worker = await Worker.find(JobRequest.workerId);
        const JobRequestsWithWorkerName = await Promise.all(
            JobRequests.map(async (jobRequest) => {
                const worker = await Worker.findById(jobRequest.workerId);
                return {
                    ...jobRequest._doc,
                    workerName: worker.name, 
                    Phone: worker.phoneNumber,
                };
            })
        );
        res.status(200).json(JobRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//leave review
export const leaveReview = async(req,res)=>{
    try {
        const { JobRequestId, rating, comment } = req.body;
        if(!JobRequestId || !rating || !comment) {
            return res.status(400).json({message:"Please fill all fields"});
        }
        const JobRequest = await JobRequest.findById(JobRequestId);
        if (!JobRequest) {
            return res.status(404).json({ message: "JobRequest not found" });
        }
        JobRequest.review = { rating, comment };
        await JobRequest.save();
        res.status(200).json({ message: "Review submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const viewCustomer = async(req,res)=>{
    try {
        const userId = req.user._id;
        if(!userId) {
            return res.status(400).json({message:"Please provide user ID"});
        }
        const customer = await User.findById(userId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBooking = async(req,res)=>{
    console.log(req.params.id);
    try {

        const bookingId = req.params.id;
        if(!bookingId) {
            return res.status(400).json({message:"Please provide booking ID"});
        }
        const booking = await JobRequest.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        await booking.deleteOne();
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}