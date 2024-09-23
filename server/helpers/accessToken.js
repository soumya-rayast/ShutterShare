const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    try {
        // Include relevant user information in the token
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
    } catch (error) {
        console.error("Error generating access token:", error.message);
        throw new Error("Could not generate access token");
    }
};

module.exports = { generateAccessToken };
