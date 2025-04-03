import express from "express";
import bcrypt from "bcrypt";
import Worker from "../models/Worker.js";

const router = express.Router();

// 📌 Create a new worker (Includes password hashing)
router.post("/", async (req, res) => {
  try {
    const { name, username, email, password, phoneNumber, serviceType, area,price } = req.body;

    // Check if email already exists
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) return res.status(400).json({ error: "Worker already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newWorker = new Worker({ 
      name, 
      username, 
      email, 
      password: hashedPassword, 
      phoneNumber, 
      serviceType, 
      area,
      price,
    });

    await newWorker.save();
    res.status(201).json({ message: "Worker added successfully", worker: newWorker });
  } catch (error) {
    console.error("Error creating worker:", error);
    res.status(500).json({ error: "Error creating worker" });
  }
});

// 📌 Get all workers (Exclude password)
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find().select("-password"); // Exclude password
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching workers" });
  }
});

// 📌 Get a single worker (Exclude password)
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).select("-password"); // Exclude password
    if (!worker) return res.status(404).json({ message: "Worker not found" });

    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Edit worker details (Prevent password change here)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    delete updates.password; // Prevent password updates in this route

    const updatedWorker = await Worker.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!updatedWorker) return res.status(404).json({ error: "Worker not found" });

    res.json({ message: "Worker updated successfully", worker: updatedWorker });
  } catch (error) {
    res.status(500).json({ error: "Error updating worker" });
  }
});

// 📌 Update worker status
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const worker = await Worker.findByIdAndUpdate(id, { status }, { new: true }).select("-password");
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 Update worker password
router.put("/:id/password", async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both current and new passwords are required" });
    }

    const worker = await Worker.findById(id);
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, worker.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    worker.password = hashedPassword;
    await worker.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating password" });
  }
});

export default router;
