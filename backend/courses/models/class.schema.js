const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: { type: String, required: true, uppercase: true },
    textbooks: [
        {
            title: { type: String, required: true },
            author: String,
            year: Number,
            publisher: String,
            isbn: String
        }],
    evaluation: [{
            name: { type: String, required: true },
            evaluatedLearningOutcomes: { type: [Boolean], required: true },
            weight: { type: Number, required: true },
        }],
});

module.exports = classSchema;