import axios from 'axios';

import env from '../environments/dev.env';

class AuthService {
    API_ENDPOINT = env.API_ENDPOINT;

    async isAuthServiceActive() {
        const url = `${this.API_ENDPOINT}/auth/`;
        const result = await axios.get(url);
        return result.data;
    }

    async isLoggedIn(sessionId, universalId, callback) {
        try {
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

    saveSession(data) {
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.setItem('universalId', data.universalId);
    }
}

export default new AuthService();