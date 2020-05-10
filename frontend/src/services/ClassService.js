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

    async getClasses(majorId, page, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/major/${majorId}?page=${page}`);
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