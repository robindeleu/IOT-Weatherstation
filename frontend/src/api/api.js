import axios from 'axios';
import Auth from '../modules/auth'

export default () => {
    let api = axios.create({
        baseURL: 'http://localhost:3030',
        headers: {
            authorization: `Bearer ${Auth.getUser().accessToken}`
        }
    });
    return api
};