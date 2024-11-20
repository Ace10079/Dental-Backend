require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// Add autoIndex and other recommended options
const connection = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, // Ensure indexes are created automatically
});

connection.on('open', () => {
    console.log("MongoDB Connected");
}).on('error', (error) => {
    console.error("MongoDB Connection error:", error);
});

module.exports = connection;
