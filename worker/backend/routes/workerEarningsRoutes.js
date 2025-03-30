import express from "express";
import { getEarningsByMonth, getJobsForMonth } from "../controllers/workerEarningsController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Route to get total earnings and job count for a month
router.get("/:month", protectRoute, getEarningsByMonth);

// Route to get details of all jobs completed in a specific month
router.get("/:month/jobs", protectRoute, getJobsForMonth);

export default router;
