import express from "express";
import Worker from "../models/Worker.js";

const router = express.Router();

// 📌 Create a new worker
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, skill, bio } = req.body;
    
    // Check if email already exists
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) return res.status(400).json({ error: "Worker already exists" });

    const newWorker = new Worker({ fullName, email, phoneNumber, skill, bio });
    await newWorker.save();

    res.status(201).json({ message: "Worker added successfully", worker: newWorker });
  } catch (error) {
    res.status(500).json({ error: "Error creating worker" });
  }
});

// 📌 Get all workers
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching workers" });
  }
});

// 📌 Edit worker details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWorker = await Worker.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedWorker) return res.status(404).json({ error: "Worker not found" });

    res.json({ message: "Worker updated successfully", worker: updatedWorker });
  } catch (error) {
    res.status(500).json({ error: "Error updating worker" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    res.json(worker);
  } catch (error) {
    console.error("Error updating worker status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
    try {
      const worker = await Worker.findById(req.params.id);
      if (!worker) return res.status(404).json({ message: "Worker not found" });
  
      res.json(worker);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;
