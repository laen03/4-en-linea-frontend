import config from '../envConfig'
import http from 'axios';
import { User } from 'models';
import { handlerError } from './hanlderError';

const URL = `${config.ApiUrl}/auth`;
const USER_ID = 'User';

export function login(params:any){
    return http.post(`${URL}/login`,params).then( data=>{
        let user = data.data;
        if(user.success){
            loginUser({data:user.data, access_token:user.access_token});
            return {success:true};
        }
        return  {success:false};
    }).catch( err => handlerError(err));
}

export function getAuthUser():User|null{
    const data = localStorage.getItem(USER_ID);
    if(data){
        return JSON.parse(data);
    }
    return null;
}
export function logout(){
    logoutUser();
    return true;
}

export function getUser():User|null{
    var data = localStorage.getItem(USER_ID);
    if(data){
        return JSON.parse(data);
    }
    return null;
}

export function register(params:any){
    return http.post(`${URL}/register`,params).then( result => {
        let user = result.data;
        return user;
        /*if(user.success){
            loginUser({data:user.data, access_token:user.access_token});
            return true;
        }
        return false;*/
    }).catch(err => handlerError(err));
}

export function facebook(id:string,access_token:string,email:string){
    return http.post(`${URL}/facebook`,{oauth_uid:id,email:email,access_token:access_token}).then( data => {
        let user = data.data;
        if(user.success){
            loginUser({data:user.data, access_token:user.access_token});
            return {success:true};
        }
        return  {success:false};
    }).catch( err => handlerError(err));;
}

export function google(id:string,access_token:string,email:string){
    return http.post(`${URL}/google`,{oauth_uid:id,email:email,access_token:access_token}).then( data => {
        let user = data.data;
        if(user.success){
            loginUser({data:user.data, access_token:user.access_token});
            return {success:true};
        }
        return  {success:false};
    }).catch( err => handlerError(err));;
}

// private functions 
function loginUser(data:any){
    localStorage.setItem(USER_ID,JSON.stringify(data))
}

export function logoutUser(){
    localStorage.removeItem(USER_ID);
    sessionStorage.clear();
}

