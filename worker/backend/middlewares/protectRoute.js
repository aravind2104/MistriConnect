import jwt from 'jsonwebtoken';
import Worker from '../models/workerModel.js';

const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.worker = await Worker.findById(decoded.id).select('-password'); // Exclude password
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export default protectRoute;
