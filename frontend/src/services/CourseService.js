import axios from 'axios';

import env from '../environments/dev.env';

class UserService {
    API_ENDPOINT = `${env.API_ENDPOINT}courses`;

    async getCourseGroup(page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/groups/?page=${page}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async createCourseGroup(prefix, name, callback) {
        try {
            const res = await axios.post(
                `${this.API_ENDPOINT}/groups/`,
                {prefix,name},
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res);
            return res;
        } catch (err) {
            if (callback) callback(undefined, err);
            throw err;
        }
    }

    async updateCourseGroup(originalPrefix, newPrefix, newName, callback) {
        try {
            const res = await axios.patch(
                `${this.API_ENDPOINT}/groups/${originalPrefix}`,
                {
                    prefix: newPrefix,
                    name: newName
                }, 
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res);
            return res;
        } catch (err) {
            if (callback) callback(undefined, err);
            throw err;
        }
    }

    async deleteCourseGroup(prefix, callback) {
        try {
            const res = await axios.delete(
                `${this.API_ENDPOINT}/groups/${prefix}`,
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res);
            return res;
        } catch (err) {
            if (callback) callback(undefined, err);
            throw err;
        }
    }

    async getCourseGroupCourses(group, page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/groups/${group}?page=${page}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getCourse(code, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/course/${code}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async createCourse(group, code, name, description, scu, callback) {
        try {
            const res = await axios.post(
                `${this.API_ENDPOINT}/course`,
                {group, code, name, description, scu},
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateCourse(originalCode, newCode, newName, callback) {
        try {
            const res = await axios.patch(
                `${this.API_ENDPOINT}/course/${originalCode}`,
                {
                    code: newCode,
                    name: newName
                },
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateCourseDescription(code, description, scu, callback) {
        try {
            const res = await axios.patch(
                `${this.API_ENDPOINT}/course/${code}`,
                {
                    description,
                    scu
                },
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateCourseLearningOutcomes(code, learningOutcomes, callback) {
        try {
            const res = await axios.patch(
                `${this.API_ENDPOINT}/course/${code}`,
                {
                    learningOutcomes
                }, 
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async deleteCourse(code, callback) {
        try {
            const res = await axios.delete(`${this.API_ENDPOINT}/course/${code}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async createClass(courseCode, classCode, callback) {
        try {
            const res = await axios.post(
                `${this.API_ENDPOINT}/course/${courseCode}`,
                {code: classCode},
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateClassTextbooks(courseCode, classCode, textbooks, callback) {
        try {
            const res = await axios.patch(
                `${this.API_ENDPOINT}/course/${courseCode}/${classCode}`,
                {textbooks},
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateClassEvaluations(courseCode, classCode, evaluation, callback) {
        try {
            const res = await axios.patch(
                `${this.API_ENDPOINT}/course/${courseCode}/${classCode}`,
                {evaluation},
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async deleteClass(courseCode, classCode, callback) {
        try {
            const res = await axios.delete(
                `${this.API_ENDPOINT}/course/${courseCode}/${classCode}`, 
                { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } }
            );
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }
}

export default new UserService();