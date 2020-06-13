var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    universalId: { type: String, required: true },
    name: { type: String, required: true },
});

module.exports = StudentSchema;