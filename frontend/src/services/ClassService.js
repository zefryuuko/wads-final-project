import axios from 'axios';

import env from '../environments/dev.env';

class UserService {
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
}

export default new UserService();