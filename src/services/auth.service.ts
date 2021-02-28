import config from '../envConfig'
import http from 'axios';

const URL = `${config.ApiUrl}/auth`;

export class AuthService {

    login(params:any) { 
        return http.post(`${URL}/login`,params)
    }

    register(params:any) { 
        return http.post(`${URL}/register`,params)
    }

}