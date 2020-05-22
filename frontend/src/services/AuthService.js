import axios from 'axios';

import env from '../environments/dev.env';

class AuthService {
    API_ENDPOINT = env.API_ENDPOINT;

    async isAuthServiceActive() {
        const url = `${this.API_ENDPOINT}/auth/`;
        const result = await axios.get(url);
        return result.data;
    }

    async isLoggedIn(callback) {
        try {
            const sessionId = localStorage.getItem('sessionId');
            const universalId = localStorage.getItem('universalId');
            const url = `${this.API_ENDPOINT}auth/session?sessionId=${sessionId}&universalId=${universalId}`;
            const res = await axios.get(url);
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async login(emailAddress, password, callback) {
        try {
            const url = `${this.API_ENDPOINT}auth/session`;
            const res = await axios.post(url, {emailAddress, password});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async logout(callback) {
        try {
            const url = `${this.API_ENDPOINT}auth/session`;
            const sessionId = localStorage.getItem('sessionId');
            const res = await axios.delete(url, {header: {"Content-Type": "application/json;charset=utf-8"}, data: {sessionId}});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    async logoutFromAllDevices(callback) {
        try {
            const url = `${this.API_ENDPOINT}auth/session`;
            const sessionId = localStorage.getItem('sessionId');
            const res = await axios.delete(url, {data: {sessionId, revokeAll: true}});
            if (callback) callback(res.data);
            return res.data;
        } catch (err) {
            if (callback) callback(err);
            return err;
        }
    }

    saveSession(data) {
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.setItem('universalId', data.universalId);
    }

    clearSession() {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('universalId');
    }

    isSessionTampered() {
        const sessionId = localStorage.getItem('sessionId');
        const universalId = localStorage.getItem('universalId');
        const activeAccount = localStorage.getItem('activeAccount');
        if (!(sessionId && universalId && activeAccount)) return true;

        // Validate activeAccount field
        if (activeAccount.split(",").length !== 2) return true;
        
        return false;
    }
}

export default new AuthService();