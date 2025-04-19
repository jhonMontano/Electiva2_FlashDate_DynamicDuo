const mongoose = require("mongoose");
require("dotenv").config();

const connectBD = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI,{
       });
       console.log("✅ Connected to MongoDB")
    } catch (error) {
        console.log("❌ Error to connet to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectBD;