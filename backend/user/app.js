const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.MONGO_ADDRESS, 
    { useNewUrlParser: true, userUnifiedTopology: true }, 
    () => {
    console.log("Connected to MongoDB");
});

// Import Routes
app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route')); 


app.get('/', (req, res) => {
    res.json({"message": "success"});
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});