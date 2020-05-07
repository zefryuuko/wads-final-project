var mongoose = require('mongoose');
var ScheduleSchema = require('./schedule.schema');
var StudentSchema = require('./student.schema');

var ClassSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classCode: { type: String, required: true },
    classType: { type: String, required: true },
    courseCode: { type: String, required: true },
    lecturers: { type: [String] },
    students: { type: [StudentSchema] },
    metadata: {},
    schedule: { type:  [ScheduleSchema] }
});

module.exports = ClassSchema;
// module.exports = mongoose.model('class', ClassSchema);