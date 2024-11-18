const User = require("../modules/user/user.model");
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const token = jwt.sign({
            userId: user._id, role: user.role
        }, jwt_secret, { expiresIn: '1h' });

        return token;
    } catch (error) {
        console.error("Error during token generation:", error);
        throw error;
    }
};


module.exports = generateToken;
