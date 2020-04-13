var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    user: mongoose.Schema.types.ObjectId,
    currentGPA: Number,
    currentSAT: Number,
    major: String
});

module.exports = mongoose.model('student', StudentSchema);