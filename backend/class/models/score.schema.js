var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    evaluationName: { type: String, required: true },
    score: { type: String, required: true },
});

module.exports = ScoreSchema;