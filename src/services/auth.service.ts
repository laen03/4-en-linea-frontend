import config from '../envConfig'
import http from 'axios';

const URL = `${config.ApiUrl}/auth`;

export function login(params:any){
    return http.post(`${URL}/login`,params);
}

export function register(params:any){
    return http.post(`${URL}/register`,params);
}

export function thirdParty(id:string){
    return http.post(`${URL}/thirdParty`,{oauth_uid:id});
}
