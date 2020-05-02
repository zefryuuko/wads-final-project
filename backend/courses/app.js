const dotenv = require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');

// Express configuration
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose configuration
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
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

// Import routes
app.use('/course', require('./routes/courses.route'));
app.use('/groups', require('./routes/groups.route'));

// Listen for requests
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});