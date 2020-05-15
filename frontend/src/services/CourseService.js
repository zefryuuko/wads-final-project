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

    async createCourseGroup(prefix, name, callback) {
        try {
            const res = await axios.post(
                `${this.API_ENDPOINT}/groups/`,
                {prefix,name}
            );
            if (callback) callback(res);
            return res;
        } catch (err) {
            console.log(err)
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
                }
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