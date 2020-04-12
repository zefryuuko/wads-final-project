const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group: { type: mongoose.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true, uppercase: true, unique: true, dropDups: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    learningOutcomes: [String],
    scu: { type: Number, required: true },
    class: [{
        code: { type: String, required: true, uppercase: true, unique: true, dropDups: true },
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
    }],
});

module.exports = mongoose.model('Course', courseSchema);