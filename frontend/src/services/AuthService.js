import axios from 'axios';

import env from '../environments/dev.env';

class AuthService {
    API_ENDPOINT = env.API_ENDPOINT;

    async isAuthServiceActive() {
        const url = `${this.API_ENDPOINT}/auth/`;
        const result = await axios.get(url);
        return result.data;
    }

    async isLoggedIn(sessionId, universalId) {
        try {
            const url = `${this.API_ENDPOINT}/auth/session?sessionId=${sessionId}&universalId=${universalId}`;
            const result = await axios.get(url);
            return result.data;
        } catch (err) {
            return err.response.data;
        }
    }

    async login(emailAddress, password) {
        try {
            const url = `${this.API_ENDPOINT}/auth/session`;
            const result = await axios.post(url, {emailAddress, password});
            return result.data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new AuthService();