import axios from 'axios';

import env from '../environments/dev.env';

class UserService {
    API_ENDPOINT = `${env.API_ENDPOINT}users`;

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
}

export default new UserService();