var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateAdded: { type: Date, required: true },
    name: { type: String, required: true },
    resourceURL: { type: String, required: true },
    submissions: { type: [{
            universalId: { type: String, required: true },
            submittedAt: { type: Date, required: true },
            fileURL: { type: String, required: true }
        }]
    }
});

module.exports = AssignmentSchema;