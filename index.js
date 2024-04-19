const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const { sendOtp } = require("./controllers/otp.js");

app.use(express.json());

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(3001, (req, res) => {
        console.log("connected");
    })
}).catch(err => {
    console.log("mongoose error");
})