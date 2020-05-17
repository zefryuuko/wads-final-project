var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currentGPA: Number,
    currentSAT: Number,
    currentSOC: Number,
    major: String,
    enrolledSemesters: {
        type: [String]
    }
});

module.exports = mongoose.model('student', StudentSchema);