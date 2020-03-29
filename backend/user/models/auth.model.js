var monggose = require('mongoose');
var Schema = monggose.Schema;

var AuthSchema = new Schema({
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

mongoose.model('auth', AuthSchema);