var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.types.ObjectId,
    user: mongoose.Schema.types.ObjectId,
    currentGPA: Number,
    currentSAT: Number,
    major: String,
    enrolledSemesters: {
        type: [String]
    }
});

module.exports = mongoose.model('student', StudentSchema);