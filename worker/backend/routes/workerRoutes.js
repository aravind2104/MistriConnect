import express from "express";
import { deleteAvailability, setAvailability } from "../controllers/workerController.js";
import protectRoute from "../middlewares/protectRoute.js";
import { 
    getJobRequests, 
    acceptJobRequest, 
    rejectJobRequest, 
    getJobRequestById 
} from "../controllers/workerController.js";
import Worker from "../models/workerModel.js"; // adjust path as needed
import Job from "../models/jobRequestModel.js"; // adjust path as needed


const router = express.Router();

router.put("/availability", protectRoute, setAvailability);

// Fetch all job requests for a worker
router.get("/get-job-requests", protectRoute, getJobRequests);

// Get details of a single job request
router.get("/:id", protectRoute, getJobRequestById);

// Accept a job request
router.put("/:id/accept", protectRoute, acceptJobRequest);

// Reject a job request
router.put("/:id/reject", protectRoute, rejectJobRequest);

router.put("/availability", protectRoute, deleteAvailability);


// PATCH /api/worker/earnings
router.patch('/earnings', async (req, res) => {
  try {
    const { jobId, amount } = req.body;

    if (!jobId || typeof amount !== 'number') {
      return res.status(400).json({ message: "Job ID and amount are required." });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    // Find the worker
    const worker = await Worker.findById(job.workerId);
    if (!worker) return res.status(404).json({ message: "Worker not found." });

    // Update earnings
    worker.earnings = (worker.earnings || 0) + amount;
    await worker.save();

    res.json({ message: "Earnings updated.", earnings: worker.earnings });
  } catch (err) {
    console.error("Error updating earnings:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


export default router;
