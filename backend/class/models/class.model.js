var mongoose = require('mongoose');
var ClassSchema = require('./class.schema')

module.exports = mongoose.model('class', ClassSchema);