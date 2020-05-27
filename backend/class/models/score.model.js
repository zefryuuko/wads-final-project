var mongoose = require('mongoose');
var ScoreSchema = require('./score.schema');

module.exports = mongoose.model('score', ScoreSchema);