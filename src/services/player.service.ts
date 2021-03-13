import config from '../envConfig'
import http from 'axios';
import { handlerError } from './hanlderError';

const URL = `${config.ApiUrl}/player`;

/**
 *  Se encarga de conectar con el back-end para enviar y recuperar los datos del historial.
 * @param {*} params objeto json que se envía con size, page_number y id_user_account
 */
export function getHistory(params:any){
    return http.get(`${URL}/game`, {params:params}).then( result=>{
        return result.data
    }).catch( err => handlerError(err));
}