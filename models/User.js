const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    location: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User