var mongoose = require('mongoose');
var ScheduleSchema = require('./schedule.schema');
var StudentSchema = require('./student.schema');
var LecturerSchema = require('./lecturer.schema');
var SharedResourceSchema = require('./lecturer.schema');
var AssignmentSchema = require('./assignment.schema');

var ClassSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classCode: { type: String, required: true },
    classType: { type: String, required: true },
    courseCode: { type: String, required: true },
    lecturers: { type: [LecturerSchema] },
    students: { type: [StudentSchema] },
    sharedResources: { type: [SharedResourceSchema] },
    assignments: { type: [AssignmentSchema] },
    metadata: {},
});

module.exports = ClassSchema;