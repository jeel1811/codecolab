const mongoose = require("mongoose");
require("dotenv").config();  // Load environment variables

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Could not connect to database!", error);
    }
};
