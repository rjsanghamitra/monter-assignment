const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { sendOtp, verifyOtp } = require("./otp.js");
const dotenv = require("dotenv").config();

const createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }, { algorithm: "HS256" });
}

let email, password, location, age, designation, otp;

const initialSignup = async (req, res) => {
    try {
        email = req.body.email;
        password = req.body.password;
        sendOtp(email);
        return res.status(201).json({ msg: "obtained credentials" });
    } catch (err) {
        console.log("error in initial signup")
        return res.status(400).json({ error: err });
    }
}

const register = async (req, res) => {
    try {
        location = req.body.location;
        age = req.body.age;
        designation = req.body.designation;
        otp = req.body.otp;
        
        const check = await verifyOtp(email, otp);
        console.log(check)
        if (!check) {
            return res.status(401).json({ msg: "invalid otp" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hash,
            location,
            age,
            designation
        });
        const savedUser = await newUser.save();
        const token = await createToken(savedUser._id);
        return res.status(201).json(savedUser);
    } catch (err) {
        console.log("error in register")
        return res.status(500).json({ error: err });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).json({ msg: "Incorrect password" });
        }
        const token = await createToken(user._id);
        delete user.password;
        return res.cookie("token", token, { httpOnly: true, sameSite: "strict" }).header("Authorization").status(200).json({ token, user });
    } catch (err) {
        console.log("login handler error");
        return res.status(500).json({error: err})
    }
}

module.exports = { register, login, initialSignup };