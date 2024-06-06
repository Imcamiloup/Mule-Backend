import crypto from "crypto";
import { User } from "../database/db";
import { sendEmail } from "./sendEmail";


export const requestPasswordReset  = async (req, res) => {
    const { email } = req.body;
    const user = await User
        .findOne({ email })
        .exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const verificationCode = crypto.randomBytes(20).toString("hex");
    await User
        .findOneAndUpdate({ email }, { verificationCode })
        .exec();
    sendEmail({
        to: email,
        subject: "Reset your password",
        text: `To reset your password, click on this link: ${process.env.BACK_END_URL}/reset-password/${verificationCode}`
    });
    res.status(200).json({ message: "Email sent" });
}

export const resetPassword = async (req, res) => {
    const { verificationCode, password } = req.body;
    const user = await User
        .findOne({ verificationCode })
        .exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await User
        .findOneAndUpdate({ verificationCode }, { password })
        .exec();
    res.status(200).json({ message: "Password updated" });
}


