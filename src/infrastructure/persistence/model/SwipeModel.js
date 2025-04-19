const mongoose = require("mongoose");

const SwipeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, enum: ["like", "dislike"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Swipe", SwipeSchema);  