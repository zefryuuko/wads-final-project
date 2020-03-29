var monggose = require('mongoose');
var Schema = monggose.Schema;

var StudentSchema = new Schema({
    user: Schema.ObjectId,
    currentGPA: Number,
    currentSAT: Number,
    major: String
});

mongoose.model('student', StudentSchema);