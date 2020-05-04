const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);   // Fix "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead."

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, dropDups: true },
    prefix: { type: String, required: true, unique: true, uppercase: true, dropDups: true },
    courses: { 
        type: [ {
            name: { type: String, required: true },
            code: { type: String, required: true },
            id: { type: mongoose.Schema.Types.ObjectId, required: true }
        }] 
    }
});

module.exports = mongoose.model('Group', groupSchema);