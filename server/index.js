const express = require('express');
const dotenv = require('dotenv')
const cors = require("cors");
const { readdirSync } = require('fs');
const { connectDB } = require('./connection');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// Connecting to database
connectDB()

app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server Running")
})

// Routes
readdirSync('./routes').map((route) => {
    app.use('/api', require(`./routes/${route}`))
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}) 