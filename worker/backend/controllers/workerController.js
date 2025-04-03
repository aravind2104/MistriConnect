import Worker from "../models/workerModel.js";
import JobRequest from "../models/jobRequestModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Earnings from "../models/earningsModel.js";

// @desc    Update worker availability
// @route   PUT /api/workers/availability
// @access  Private (Authenticated Worker)
export const setAvailability = async (req, res) => {
    try {
        const { date, slot } = req.body;
        const workerId = req.worker.id; // From JWT token

        // Validate input
        if (!date || !slot) {
            return res.status(400).json({ message: "Date and slot are required" });
        }

        const worker = await Worker.findById(workerId);
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        // Check if the slot is valid
        const validSlots = ["forenoon", "afternoon"];
        if (!validSlots.includes(slot)) {
            return res.status(400).json({ message: "Invalid slot. Choose 'forenoon' or 'afternoon'." });
        }

        // Prevent duplicate unavailability entries
        const isAlreadyUnavailable = worker.availability.some(
            (entry) => entry.date === date && entry.slot === slot
        );

        if (isAlreadyUnavailable) {
            return res.status(400).json({ message: "Slot already marked as unavailable for this date." });
        }

        // Add the new unavailability entry
        worker.availability.push({ date, slot });
        await worker.save();

        res.status(200).json({ message: "Unavailability updated", availability: worker.availability });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// @desc    Get all job requests for a worker
// @route   GET /api/job-requests
// @access  Private (Worker only)


export const getJobRequests = async (req, res) => {
    try {
 
        if (!mongoose.Types.ObjectId.isValid(req.worker.id)) {
            return res.status(400).json({ message: "Invalid worker ID" });
        }

        const workerId = new mongoose.Types.ObjectId(String(req.worker.id));

        const jobRequests = await JobRequest.find({ workerId })
            .populate("customerId", "username email"); // ✅ "User" model should be registered


        res.status(200).json(jobRequests);
    } catch (error) {
        console.error("Error fetching job requests:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// @desc    Get details of a specific job request
// @route   GET /api/job-requests/:id
// @access  Private (Worker only)
export const getJobRequestById = async (req, res) => {
    try {
        const jobRequest = await JobRequest.findById(req.params.id).populate("customerId", "username email");
        if (!jobRequest || jobRequest.workerId.toString() !== req.worker.id) {
            return res.status(404).json({ message: "Job request not found" });
        }
        res.status(200).json(jobRequest);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Accept a job request
// @route   PUT /api/job-requests/:id/accept
// @access  Private (Worker only)
export const acceptJobRequest = async (req, res) => {
    try {
        const jobRequest = await JobRequest.findById(req.params.id);
        console.log("Job Request:", jobRequest);
        if (!jobRequest || jobRequest.workerId.toString() !== req.worker.id) {
            return res.status(404).json({ message: "Job request not found or unauthorized" });
        }

        if (jobRequest.status !== "pending") {
            return res.status(400).json({ message: "Job request is not pending" });
        }

        // Extract job details
        const jobDate = jobRequest.date; // Already stored in "YYYY-MM-DD" format
        const slot = jobRequest.slot; // Either "forenoon" or "afternoon"

        // Fetch worker details
        const worker = await Worker.findById(req.worker.id);
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        // Check if worker is already booked for the same slot
        const isAlreadyBooked = worker.availability.some(
            (entry) => entry.date === jobDate && entry.slot === slot
        );

        if (isAlreadyBooked) {
            return res.status(400).json({ message: "Worker is already booked for this slot!" });
        }

        // Mark job as accepted
        jobRequest.status = "accepted";
        await jobRequest.save();

        // Add job slot to worker availability
        worker.availability.push({ date: jobDate, slot });
        await worker.save();

        // Add job to earnings
        const monthYear = new Date(jobDate).toLocaleString("default", { month: "long", year: "numeric" });
        let earnings = await Earnings.findOne({ workerId: req.worker.id, month: monthYear });

        if (!earnings) {
            earnings = new Earnings({
                workerId: req.worker.id,
                month: monthYear,
                totalEarned: jobRequest.price,
                jobs: [{ jobId: jobRequest._id, amount: jobRequest.price }]
            });
        } else {
            earnings.totalEarned += jobRequest.price;
            earnings.jobs.push({ jobId: jobRequest._id, amount: jobRequest.price });
        }

        await earnings.save();

        res.status(200).json({
            message: "Job request accepted and added to earnings",
            jobRequest,
            updatedAvailability: worker.availability
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// @desc    Reject a job request
// @route   PUT /api/job-requests/:id/reject
// @access  Private (Worker only)
export const rejectJobRequest = async (req, res) => {
    try {
        const jobRequest = await JobRequest.findById(req.params.id);
        if (!jobRequest || jobRequest.workerId.toString() !== req.worker.id) {
            return res.status(404).json({ message: "Job request not found" });
        }

        jobRequest.status = "rejected";
        await jobRequest.save();

        res.status(200).json({ message: "Job request rejected", jobRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteAvailability = async (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;
        const workerId = req.worker.id; // Get worker ID from authenticated user

        if (!day || !startTime || !endTime) {
            return res.status(400).json({ message: "Invalid request data." });
        }

        // Find worker and update availability by removing the specified time slot
        const worker = await Worker.findById(workerId);
        if (!worker) {
            return res.status(404).json({ message: "Worker not found." });
        }

        worker.availability[day] = worker.availability[day].filter(
            (slot) => !(slot.startTime === startTime && slot.endTime === endTime)
        );

        await worker.save();

        res.status(200).json({ message: "Availability slot removed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

