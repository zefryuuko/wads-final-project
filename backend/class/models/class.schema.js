var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classCode: { type: String, required: true },
    courseCode: { type: String, required: true },
    lecturers: { type: [String] },
    students: { type: [String] }
});

module.exports = ClassSchema;
// module.exports = mongoose.model('class', ClassSchema);