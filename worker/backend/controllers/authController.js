import Worker from '../models/workerModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

// Register Worker
export const registerWorker = async (req, res) => {
    const { name,username, email, password, phoneNumber, serviceType, area } = req.body;

    if (!name || !username || !email || !password || !phoneNumber || !serviceType || !area) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingWorker = await Worker.findOne({ email });

        if (existingWorker) return res.status(400).json({ message: 'Worker already exists with this email' });
        const existingWorkerUsername=await Worker.findOne({username})

        if(existingWorkerUsername) return res.status(400).json({message:'Worker already exists with this username'})

        const hashedPassword = await bcrypt.hash(password, 10);
        const newWorker = new Worker({ name,username, email, password: hashedPassword, phoneNumber, serviceType, area });

        await newWorker.save();

        generateTokenAndSetCookie(newWorker, res);

        res.status(201).json({ message: 'Worker registered successfully', worker: newWorker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Worker
export const loginWorker = async (req, res) => {
    const { username, email, password } = req.body;

    if ((!email && !username) || !password) {
        return res.status(400).json({ message: "Email or username and password are required" });
    }

    try {
        // Find the worker by email or username
        const worker = await Worker.findOne({
            $or: [{ email }, { username }]
        });

        if (!worker) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, worker.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(worker, res);

        res.status(200).json({ message: "Login successful", worker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Logout Worker
export const logoutWorker = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
};
