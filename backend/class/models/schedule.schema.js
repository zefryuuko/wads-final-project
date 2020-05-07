var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
});

module.exports = ScheduleSchema;