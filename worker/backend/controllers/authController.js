import Worker from '../models/workerModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

// Register Worker
export const registerWorker = async (req, res) => {
    const { username, email, password, phoneNumber, serviceType, Area } = req.body;

    if (!username || !email || !password || !phoneNumber || !serviceType || !Area) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) return res.status(400).json({ message: 'Worker already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newWorker = new Worker({ username, email, password: hashedPassword, phoneNumber, serviceType, Area });

        await newWorker.save();

        generateTokenAndSetCookie(newWorker, res);

        res.status(201).json({ message: 'Worker registered successfully', worker: newWorker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Worker
export const loginWorker = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    try {
        const worker = await Worker.findOne({ email });
        if (!worker) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, worker.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        generateTokenAndSetCookie(worker, res);

        res.status(200).json({ message: 'Login successful', worker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout Worker
export const logoutWorker = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
};
