var mongoose = require('mongoose');
var ClassSchema = require('./class.schema')

var SemesterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    majorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    period: { type: String, required: true },
    classes: { type: [ClassSchema] }
});

module.exports = mongoose.model('semester', SemesterSchema);