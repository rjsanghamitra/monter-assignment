const express = require("express");
const { register, login, initialSignup } = require("../controllers/auth.js");
const sendOtp = require("../controllers/otp.js");
const router = express.Router();

router.post("/login", login);
router.post("/register", initialSignup);
router.post("/details", register);

module.exports = router;