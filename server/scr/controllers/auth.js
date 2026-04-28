const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1D' });
        res.status(200).json({
            status: 200,
            message: "login SuccessFull",
            data: {
                token,
                name: user.name,
                email: user.email
            }
        });

    }
    catch (error) {
        console.error(" ERROR:", error);
        res.status(500).json({
            message: error.message,

        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, password, currentPassword } = req.body;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }


        if (password) {
            if (!currentPassword) {
                return res.status(400).json({
                    status: 400,
                    message: 'Current password is required to change password'
                });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: 401,
                    message: 'Current password is incorrect'
                });
            }


            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }


        if (name) {
            user.name = name;
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    message: 'Email already in use'
                });
            }
            user.email = email;
        }


        await user.save();

        res.status(200).json({
            status: 200,
            message: 'Profile updated successfully',
            data: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Profile fetched successfully',
            data: user
        });
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

module.exports = {
    login,
    updateProfile,
    getProfile
}   