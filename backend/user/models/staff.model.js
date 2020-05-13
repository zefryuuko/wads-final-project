var mongoose = require('mongoose');

var StaffSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    permittedDomains: {
        type: [String]
    }
});

module.exports = mongoose.model('staff', StaffSchema);