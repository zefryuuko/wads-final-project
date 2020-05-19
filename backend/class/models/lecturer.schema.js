var mongoose = require('mongoose');
var ScoreSchema = require('./score.schema');

var LecturerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    universalId: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = LecturerSchema;