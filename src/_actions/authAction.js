import {AUTHACTIONS, USERACTIONS} from '../_constants'

const {LOGIN, LOGOUT} = AUTHACTIONS
const {ASSIGN} = USERACTIONS

export const saveUser = (userData) => {
    return {
        type: LOGIN,
        payload: userData
    }
}

export const assignBiker = (data) => {
    console.log(ASSIGN)
    return {
        type: ASSIGN,
        payload: data
    }
}

export const removeUser = () => {
    return {
        type: LOGOUT,
    }
}