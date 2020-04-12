const mongoose = require('mongoose');
const Group = require('../models/group.model');

class GroupUtils {
    async getGroupPrefix(groupId) {
        try {
            groupId = mongoose.Types.ObjectId(groupId);
            const result = await Group.find(
                { _id: groupId }
            );
            if (result.length > 0)return result[0].prefix;
            else return undefined;
        } catch (err) {
            if (err == 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
                return undefined;
            }
            throw err;
        }
    }

    async getGroupId(prefix) {
        try {
            const result = await Group.find(
                { prefix: prefix }
            );
            if (result.length > 0)return result[0]._id;
            else return undefined;
        } catch (err) {
            throw err;
        }
    }

    async addCourseToGroup(prefix, courseId) {
        try {
            const result = await Group.updateOne(
                { prefix: prefix },
                { $push: { courses: courseId } }
                );
            if (result.n > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }

    async removeCourseFromGroup(groupId, courseId) {
        try {
            const result = await Group.updateOne(
                { _id: groupId },
                { $pull: { courses: courseId } }
                );
            console.log("Remove course from group", result);
            if (result.n > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new GroupUtils();