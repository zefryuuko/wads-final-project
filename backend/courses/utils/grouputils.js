const mongoose = require('mongoose');
const Group = require('../models/group.model');

class GroupUtils {
    async getGroupPrefix(groupId) {
        try {
            groupId = mongoose.Types.ObjectId(groupId);
            const result = await Group.find({_id: groupId});
            if (result.length > 0)return result[0].prefix;
            else return undefined;
        } catch (err) {
            if (err == 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
                return undefined;
            }
            throw err;
        }
    }
}

module.exports = new GroupUtils();