var monggose = require('mongoose');
var Schema = monggose.Schema;

var UserSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    frontName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

mongoose.model('user', UserSchema);