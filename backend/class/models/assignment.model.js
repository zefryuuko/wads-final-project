var mongoose = require('mongoose');
var AssignmentSchema = require('./assignment.schema');

module.exports = mongoose.model('assignment', AssignmentSchema);