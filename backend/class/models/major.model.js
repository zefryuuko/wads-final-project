var mongoose = require('mongoose');
var ClassSchema = require('./class.schema')

var MajorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, dropDups: true },
    linkedSemesters: { type: [mongoose.Schema.Types.ObjectId] }
});

module.exports = mongoose.model('major', MajorSchema);