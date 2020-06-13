const mongoose = require('mongoose');
const Course = require('../models/course.model');
const Group = require('../models/group.model');

class CourseUtils {

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
            const result = await Course.find({
                "code": courseCode, 
                "class.code": { $eq: classCode } 
            });
            if (result.length > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }

    async updatePrefixes(prefix, newPrefix) {
        try {
            const result = await Course.updateMany(
                { code: { $regex: new RegExp('^' + prefix) } },
                [ { $set: { code: { $concat: [ newPrefix, { $substr: [ '$code', prefix.length, -1 ] } ] } } } ]
            );
            const result2 = await Group.updateMany(
                { 'courses.code': { $regex: new RegExp('^' + prefix) } },
                [ { 
                    $set: { 
                        courses: { 
                            $map: {
                                input: '$courses',
                                as: 'c',
                                in: {
                                    name: '$$c.name',
                                    _id: '$$c._id',
                                    id: '$$c.id',
                                    code: {
                                        $concat: [ newPrefix, { $substr: [ '$$c.code', prefix.length, -1 ] } ] 
                                    }
                                }
                            }
                        } 
                    } 
                } ]
            );

            if (result.n > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }

    async deleteCourses(prefix) {
        try {
            const result = await Course.deleteMany(
                { code: { $regex: new RegExp('^' + prefix) } }
            );
            if (result.n > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new CourseUtils();