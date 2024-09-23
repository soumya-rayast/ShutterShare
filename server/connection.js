const mongoose = require('mongoose');
const connectDB = async (req, rs) => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    if (connection.STATES.connected) return console.log("Database Connected")
    if (connection.STATES.disconnected) return console.log("Database Disconnected")
}

module.exports = { connectDB }