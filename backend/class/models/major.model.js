var mongoose = require('mongoose');
var ClassSchema = require('./class.schema')

var MajorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, dropDups: true },
    linkedSemesters: {
        type: [{
            _id: mongoose.Schema.Types.ObjectId,
            id: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            period: { type: String, required: true },
            semesterId: { type: String, required: true }
        }]}
});

module.exports = mongoose.model('major', MajorSchema);