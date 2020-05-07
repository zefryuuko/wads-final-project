var mongoose = require('mongoose');
var ScoreSchema = require('./score.schema');

var StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    universalId: { type: String, required: true },
    name: { type: String, required: true },
    scores: { type: [ScoreSchema] }
});

module.exports = StudentSchema;