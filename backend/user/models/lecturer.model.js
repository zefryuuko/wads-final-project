var mongoose = require('mongoose');

var LecturerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    enrolledSemesters: {
        type: [String]
    }
});

module.exports = mongoose.model('lecturer', LecturerSchema);