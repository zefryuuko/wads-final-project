var monggose = require('mongoose');
var Schema = monggose.Schema;

var authSchema = new Schema({
    id: {
        type: monggose.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('auth', authSchema);