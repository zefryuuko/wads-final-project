import axios from 'axios';

import env from '../environments/dev.env';

class UserService {
    API_ENDPOINT = `${env.API_ENDPOINT}users`;
    
    async getUsers(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getStaffs(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user?staff=1}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getLecturers(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user?lecturer=1}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getStudents(callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user?student=1}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
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
            const res = await axios.get(`${this.API_ENDPOINT}/user/${universalId}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async getUserById(universalId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user/${universalId}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback({}, err);
            throw err;
        }
    }

    async deleteUserById(universalId, callback) {
        try {
            const res = await axios.delete(`${this.API_ENDPOINT}/user/${universalId}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback({}, err);
            throw err;
        }
    }

    async createUser(data, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/user`, data, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateUser(userId, data, callback) {
        try {
            const res = await axios.patch(`${this.API_ENDPOINT}/user/${userId}`, data, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async updateUserProfile(userId, accountId, data, callback) {
        try {
            const res = await axios.put(`${this.API_ENDPOINT}/user/${userId}/${accountId}`, data, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }
    
    async createStudentAccount(userId, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/user/${userId}/student`, {name: "Student"}, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async createLecturerAccount(userId, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/user/${userId}/lecturer`, {name: "Lecturer"}, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async createStaffAccount(userId, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/user/${userId}/staff`, {name: "Staff"}, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async resetUserPassword(userId, callback) {
        try {
            const res = await axios.post(`${this.API_ENDPOINT}/user/${userId}/reset-password`, {}, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async deleteUserAccount(userId, accountId, callback) {
        try {
            const res = await axios.delete(`${this.API_ENDPOINT}/user/${userId}/${accountId}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    }

    async getUserAccountDetails(universalId, accountId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user/${universalId}/${accountId}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback({}, err);
            throw err;
        }
    }

    async getProfilePictureURL(universalId, callback) {
        try {
            const res = await axios.get(`${this.API_ENDPOINT}/user/${universalId}`, { headers: { Authorization: `${localStorage.getItem('sessionId')} ${localStorage.getItem('universalId')}` } });
            if (callback) callback(res.data.profilePictureURL ? res.data.profilePictureURL : "/img/user.png");
            return res.data.profilePictureURL ? res.data.profilePictureURL : "/img/user.png";
        } catch (err) {
            if (callback) callback({}, err);
            throw err;
        }   
    }
}

export default new UserService();