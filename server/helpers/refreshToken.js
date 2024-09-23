const jwt = require('jsonwebtoken');

const generateRefreshToken = (user) => {
    try {
        return jwt.sign(
            { id: user._id }, // Include essential claims
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
    } catch (error) {
        console.error("Error generating refresh token:", error.message);
        throw new Error("Could not generate refresh token");
    }
};

module.exports = { generateRefreshToken };
