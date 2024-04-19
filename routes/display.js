const express = require("express");
const User = require("../models/User");
const router = express.Router();

const getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({ user: user });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

router.get("/:id", getUserDetails);

module.exports = router;