const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, required: true, unique: true, dropDups: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    primaryEmail: { type: String, required: true },
    contactEmail: { type: String, required: true },
    phone: { type: String, required: true },
    accounts: {
        type: [{
            name: { type: String, required: true },
            accountType: { type: String, required: true },
            metadata: { type: Object , required: true },
        }]
    },
    permittedDomains: { type: [mongoose.Schema.Types.ObjectId] }
});

module.exports = mongoose.model('user', UserSchema);