var mongoose = require('mongoose');
var LecturerSchema = require('./lecturer.schema');

module.exports = mongoose.model('lecturer', LecturerSchema);