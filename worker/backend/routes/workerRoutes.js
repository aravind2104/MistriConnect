import express from "express";
import { setAvailability } from "../controllers/workerController.js";
import protectRoute from "../middlewares/protectRoute.js";
import { 
    getJobRequests, 
    acceptJobRequest, 
    rejectJobRequest, 
    getJobRequestById 
} from "../controllers/workerController.js";
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

export default router;
