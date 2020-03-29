var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    user: Schema.ObjectId,
    currentGPA: Number,
    currentSAT: Number,
    major: String
});

module.exports = mongoose.model('student', StudentSchema);