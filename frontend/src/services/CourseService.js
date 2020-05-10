import axios from 'axios';

import env from '../environments/dev.env';

class UserService {
    API_ENDPOINT = `${env.API_ENDPOINT}courses`;

    async getCourseGroup(page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/groups/?page=${page}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getCourseGroupCourses(group, page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/groups/${group}?page=${page}`);
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