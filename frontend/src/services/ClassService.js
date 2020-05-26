import axios from 'axios';

import env from '../environments/dev.env';

class ClassService {
    API_ENDPOINT = `${env.API_ENDPOINT}classes`;

    async getMajors(page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/major?page=${page}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async createMajor(name, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/major`, {name});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateMajor(majorId, name, callback) {
        try {
            const res = await axios.patch(`${this.API_ENDPOINT}/major/${majorId}`, {name});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getSemesters(majorId, page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/major/${majorId}?page=${page}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getClasses(semesterId, page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/semester/${semesterId}?page=${page}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getClass(semesterId, classId, courseId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getCourse(code, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/course/${code}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async updateClassStudents(semesterId, classId, courseId, students, callback) {
        try {
            const res = await axios.patch(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}`, {students});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateClassLecturers(semesterId, classId, courseId, lecturers, callback) {
        try {
            const res = await axios.patch(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}`, {lecturers});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async createSharedResources(semesterId, classId, courseId, data, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}/shared-resources`, {...data});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            console.log(err.response)
            if (callback) callback(err);
            throw err;
        }
    }

    async deleteSharedResources(semesterId, classId, courseId, resourceId, callback) {
        try {
            const res = await axios.delete(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}/shared-resources/${resourceId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            console.log(err.response)
            if (callback) callback(err);
            throw err;
        }
    }


    async createAssignment(semesterId, classId, courseId, data, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}/assignments`, {...data});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            console.log(err.response)
            if (callback) callback(err);
            throw err;
        }
    }

    async submitAssignment(semesterId, classId, courseId, assignmentId, data, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}/assignments/${assignmentId}/submit`, {...data});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            console.log(err.response)
            if (callback) callback(err);
            throw err;
        }
    }

    async deleteAssignment(semesterId, classId, courseId, assignmentId, callback) {
        try {
            const res = await axios.delete(`${this.API_ENDPOINT}/semester/${semesterId}/${classId}/${courseId}/assignments/${assignmentId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            console.log(err.response)
            if (callback) callback(err);
            throw err;
        }
    }

    async getCourseByStudentId(studentId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/semester/searchStudentById/${studentId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getCourseByLecturerId(lecturerId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/semester/searchLecturerById/${lecturerId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }
}

export default new ClassService();