var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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