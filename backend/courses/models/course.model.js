const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group: mongoose.Schema.Types.ObjectId,
    code: String,
    name: String,
    description: String,
    learningOutcomes: [String],
    textbooks: [
        {
            title: String,
            author: String,
            year: Number,
            publisher: String,
            ISBN: String
        }],
    evaluation: [{
            name: String,
            evaluatedLearningOutcomes: [Boolean],
            weight: Number
        }],
    scu: Number
});

module.exports = mongoose.model('Course', courseSchema);