import axios from 'axios';

import env from '../environments/dev.env';

class UserService {
    API_ENDPOINT = `${env.API_ENDPOINT}users`;
    
    async getUsers(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getStaffs(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user?staff=1}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getLecturers(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user?lecturer=1}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getStudents(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user?student=1}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getUserData(callback) {
        try {
            const universalId = localStorage.getItem('universalId');
            const res = await axios.get(`${this.API_ENDPOINT}/user/${universalId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getUserById(universalId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user/${universalId}`);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback({}, err);
            throw err;
        }
    }
}

export default new UserService();