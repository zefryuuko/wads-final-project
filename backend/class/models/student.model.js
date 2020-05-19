var mongoose = require('mongoose');
var StudentSchema = require('./student.schema');

module.exports = mongoose.model('student', StudentSchema);