const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    roomId: { type: String, require: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);