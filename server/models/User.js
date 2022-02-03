const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        validate: {
            validator: (email) => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Please fill a valid email address",
        },
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
