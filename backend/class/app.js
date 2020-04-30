const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Mongoose configuration
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: process.env.MONGO_POOL_SIZE
    }, 
    (err) => {
        if (err) {
            console.err(err);
            return;
        }
        console.log("Connected to MongoDB server.");
    }
);
mongoose.set('useCreateIndex', true);

// Import Routes
app.use('/semester', require('./routes/semester.route')); 
app.use('/major', require('./routes/major.route')); 

// Listen
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});