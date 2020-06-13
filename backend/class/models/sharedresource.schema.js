var mongoose = require('mongoose');

var SharedResourceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateAdded: { type: Date, required: true },
    addedBy: {
        universalId: { type: String, required: true },
        name: { type: String, required: true },
    },
    name: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = SharedResourceSchema;