import {login,register,getAuthUser,logout,} from './auth.service'
import {getHistory} from './player.service'
import {errorToast,infoToast,successToast,deleteToast} from './toast.service'

export{
    login,
    register,
    getAuthUser,
    logout,
    getHistory,
    errorToast,
    successToast,
    infoToast,
    deleteToast
}