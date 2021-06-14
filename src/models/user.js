const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        // Assigns createdAt and updatedAt fields with a Date type
        timestamps: true
    }
);

const User = new mongoose.model('User', UserScheme);

module.exports = User;