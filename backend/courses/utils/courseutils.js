const mongoose = require('mongoose');
const Course = require('../models/course.model');
const Group = require('../models/group.model');

class CourseUtils {
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

    async courseCodeExists(courseCode) {
        try {
            const result = await Course.find({code: courseCode}, {code: 1});
            if (result.length > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }

    async classCodeExists(courseCode, classCode) {
        try {
            if (!(courseCode || classCode)) return false;
            const result = await Course.find({"code": "COMP6343", "class": {$elemMatch: {"code":classCode}}});
            if (result.length > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new CourseUtils();