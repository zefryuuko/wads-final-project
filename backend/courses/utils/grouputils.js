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

    async addCourseToGroup(prefix, courseCode, courseName, courseId) {
        try {
            const result = await Group.updateOne(
                { prefix: prefix },
                { 
                    $push: {
                        courses:  {
                            id: courseId,
                            code: courseCode,
                            name: courseName
                        }
                    } 
                }
                );
            if (result.n > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }

    async updateCourseOnGroup(courseCode, newCourseCode, newCourseName) {
        try {
            newCourseCode = newCourseCode ? newCourseCode : courseCode;

            // Update courseCode
            const updateCourseCodeResult = await Group.findOneAndUpdate(
                { courses: { $elemMatch: { code: courseCode } } },
                {
                    $set: {
                        'courses.$.code': newCourseCode
                    }
                },
                { new: true }
            );
            console.log("updateCourseCode:", updateCourseCodeResult);
            
            // Update courseName
            if (newCourseName) {
                const updateCourseNameResult = await Group.findOneAndUpdate(
                    { courses: { $elemMatch: { code: newCourseCode } } },
                    {
                        $set: {
                            'courses.$.name': newCourseName
                        }
                    },
                    { new: true }
                );
                console.log("UpdateCourseName:", updateCourseNameResult);
            }

        } catch (err) {
            throw err;
        }
    }

    async removeCourseFromGroup(groupId, courseId) {
        try {
            const result = await Group.findOneAndUpdate(
                { 
                    _id: groupId,
                    'courses.id': { $eq: courseId }
                },
                {
                    $pull: { 
                        courses:  {
                            id: courseId
                        }
                    } 
                }
            );
            if (result.n > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new GroupUtils();