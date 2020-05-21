var mongoose = require('mongoose');
var SharedResourceSchema = require('./sharedresource.schema');

module.exports = mongoose.model('sharedResource', SharedResourceSchema);