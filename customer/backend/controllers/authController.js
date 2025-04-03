import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//register

export const register = async (req, res) => {
    try {
        const { username, email, password,area } = req.body;
        console.log(req.body);
        if(!username || !email || !password ,!area) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const existingUser = await User.findOne({ email }); 
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            area
        });
        generateTokenAndSetCookie(newUser, res);
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password not matched");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token and set cookie
        const token = generateTokenAndSetCookie(user, res);
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//update profile
export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password,area } = req.body;
        if(!username || !email || !password ,!area) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.area = area;
        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}