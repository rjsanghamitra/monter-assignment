const otpGenerator = require("otp-generator");
const OTP = require("../models/Otp.js");
const User = require("../models/User.js");
const Otp = require("../models/Otp.js");
const mailSender = require("./email.js");
const randomstring = require("randomstring");

function generate() {
    return randomstring.generate({
        length: 4,
        charset: 'numeric'
    });
}

const sendOtp = async (email) => {
    try {
        const otp = generate();
        const savedOtp = new OTP({ email, otp });
        await savedOtp.save();

        await mailSender(email, "Verify your account", `Here's your OTP: ${otp}`);
    } catch (err) {
        console.error("error in sendotp function");
    }
}

const verifyOtp = async (email, otp) => {
    try {
        const givenOtp = await Otp.findOneAndDelete({ email, otp });
        if (givenOtp) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("error in verify otp function");
    }
}

module.exports = { sendOtp, verifyOtp };