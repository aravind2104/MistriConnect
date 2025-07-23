import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (user, res) => {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }  // Token valid for 7 days
    );
    res.cookie('jwt_customer', token, {
        httpOnly: true, // Prevents XSS attacks
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
};

export default generateTokenAndSetCookie;