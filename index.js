const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const cors = require("cors");
const userRoutes = require("./routes/display.js");

app.use(express.json());

app.use(cors({
    origin: "https://user-registration-five.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/", userRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(3001, (req, res) => {
        console.log("connected");
    })
}).catch(err => {
    console.log("mongoose error");
})