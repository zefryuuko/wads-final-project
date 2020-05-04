const mongoose = require('mongoose');
const classSchema = require('./class.schema');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group: { type: mongoose.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true, uppercase: true, unique: true, dropDups: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    learningOutcomes: [String],
    scu: { type: Number, required: true },
    class: [classSchema],
});

module.exports = mongoose.model('Course', courseSchema);