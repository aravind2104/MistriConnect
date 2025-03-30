import Earnings from "../models/earningsModel.js"; // Ensure the correct path to your model

// Get total earnings and number of completed jobs in a given month
export const getEarningsByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const workerId = req.worker.id; // Extract worker ID from JWT token

        const earnings = await Earnings.findOne({ workerId, month });

        if (!earnings) {
            return res.status(404).json({ message: "No earnings data found for this month." });
        }

        res.status(200).json({
            month: earnings.month,
            totalEarned: earnings.totalEarned,
            completedJobs: earnings.jobs.length
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get details of all jobs completed in a specific month
export const getJobsForMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const workerId = req.worker.id; // Extract worker ID from JWT token

        const earnings = await Earnings.findOne({ workerId, month }).populate("jobs.jobId");

        if (!earnings) {
            return res.status(404).json({ message: "No job details found for this month." });
        }

        res.status(200).json({ jobs: earnings.jobs });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
