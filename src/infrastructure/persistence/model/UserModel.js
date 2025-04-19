const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email no valid'] 
    },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    preferences: { 
        type: [String],
        required: true,
        enum: ["Male", "Female"]
    },
    location: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true }
    },
    profilePhoto: { type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
