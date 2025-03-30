import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (worker, res) => {
    const token = jwt.sign(
        { id: worker._id, email: worker.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }  // Token valid for 7 days
    );

    res.cookie('jwt', token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
};

export default generateTokenAndSetCookie;
