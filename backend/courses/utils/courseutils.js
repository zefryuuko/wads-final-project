const mongoose = require('mongoose');
const Course = require('../models/course.model');

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
            const result = await Course.find({"code": "COMP6343", "class": {$elemMatch: {"code":classCode}}});
            if (result.length > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new CourseUtils();