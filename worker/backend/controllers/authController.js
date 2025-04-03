import Worker from '../models/workerModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

import jwt from 'jsonwebtoken'
import { transporter } from '../transporter/transporter.js';
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
        const token=generateTokenAndSetCookie(worker, res);

        res.status(200).json({ message: "Login successful", worker,token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Logout Worker
export const logoutWorker = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
};


export const updateWorkerProfile = async (req, res) => {
    try {
        const { phoneNumber, area, serviceType } = req.body;
        
        // Validate required fields
        if (!phoneNumber || !area || !serviceType) {
            return res.status(400).json({ message: 'Phone number, area, and service type are required' });
        }

        // Update the worker profile
        const updatedWorker = await Worker.findByIdAndUpdate(
            req.worker._id,
            { 
                phoneNumber,
                area,
                serviceType 
            },
            { new: true, runValidators: true }
        ).select('-password -earnings'); // Exclude sensitive fields

        if (!updatedWorker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        res.status(200).json(updatedWorker);
    } catch (error) {
        console.error('Error updating worker profile:', error);
        res.status(500).json({ message: 'Server error while updating profile' });
    }
};

export const forgotPassword=async (req,res)=>{

    try{
        console.log(process.env.MONGO_URI)
        const {email}=req.body;

        const user = await Worker.findOne({email})
        
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const resetLink = `http://localhost:5173/reset-password/${token}`

        const info = await transporter.sendMail({
            from: '"Mistri Connect" <chrisscharls9@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Reset Password for Mistri Connect", // Subject line
            text: "Click the below link to reset you password", // plain text body
            html: `Click <a href="${resetLink}">here</a>`
        });
        
        res.status(200).json({message:"Reset link sent successfully"})
    }
    catch(error){
        res.status(500).json({message:"Error in sending reset link"})
        console.log("Error in sending reset link",error)
    }

}

export const resetPassword = async (req,res)=>{
    try{

        const {token,password}=req.body
        if(!token){
            console.log("Token not found")
            return res.status(400).json({message:"Token not found"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            console.log("Invalid token")
            return res.status(400).json({message:"Invalid token"})
        }

        const workerId=decoded.id;

        const worker = await Worker.findById(workerId)
        if(!worker){
            console.log("Worker not found")
            return res.status(400).json({message:"Worker not found"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        worker.password=hashedPassword;
        await worker.save();

        return res.status(200).json({message:"Password changed successfully"})
    }
    catch(error){
        console.log("Error in resetting",error)
        return res.status(400).json({message:"Error in resetting password"})
    }
    
}