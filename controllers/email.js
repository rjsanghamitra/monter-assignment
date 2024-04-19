const nodemailer = require("nodemailer");

const mailSender = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
                user: process.env.SMPT_MAIL,            // sender's mail id
                pass: process.env.SMPT_PASS,
            }
        });
        const info = await transporter.sendMail({
            from: process.env.SMPT_MAIL,
            to: email,
            subject: subject,
            text: body,
        });
        return info;
    } catch (err) {
        console.error("mail sender: ");
    }
};

module.exports = mailSender;