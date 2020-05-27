var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currentGPA: Number,
    currentSAT: Number,
    currentSOC: Number,
    major: String,
    satDetails: { 
        type: [{
            name: { type: String, required: true },
            points: { type: Number, required: true }
        }] 
    },
    socDetails: { 
        type: [{
            name: { type: String, required: true },
            hours: { type: Number, required: true }
        }] 
    },
    enrolledSemesters: {
        type: [String]
    }
});

module.exports = mongoose.model('student', StudentSchema);