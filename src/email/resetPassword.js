import {User}  from "../database/db.js";
import { sendPasswordResetEmail } from "../email/emailPassword.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Endpoint to reset the password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        } else {
            return res.status(500).json({ message: 'Error resetting password.' });
        }
    }
};

const requestPasswordReset = async (req, res) => {
    const { email, newPassword, token } = req.body;
    if (token && newPassword) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ where: { email: decoded.email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.password = newPassword;
            await user.save();
            return res.status(200).json({ message: 'Password reset successfully.' });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token.' });
            } else {
                return res.status(500).json({ message: 'Error resetting password.' });
            }
        }
    } else if (email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await sendPasswordResetEmail({ username: user.username, email: user.email });
        return res.status(200).json({ message: "Password reset email sent." });
    } else {
        return res.status(400).json({ message: "Invalid request." });
    }
};

export { resetPassword, requestPasswordReset };