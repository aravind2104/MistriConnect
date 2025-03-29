import User from "./models/user.model";
import bcrypt from "bcryptjs";

//register

export const register = async (req, res) => {
    try {
        const { username, email, password,address } = req.body;
        if(!username || !email || !password ,!address) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address
        });
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
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//update profile
export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password,address } = req.body;
        if(!username || !email || !password ,!address) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.address = address;
        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

