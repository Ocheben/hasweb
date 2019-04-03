import {AUTHACTIONS, USERACTIONS} from '../_constants'

const {LOGIN, LOGOUT} = AUTHACTIONS
const {ASSIGN, PICKUP, DELIVER} = USERACTIONS

export const saveUser = (userData) => {
    return {
        type: LOGIN,
        payload: userData
    }
}

export const assignBiker = (data) => {
    return {
        type: ASSIGN,
        payload: data
    }
}

export const pickUp = (data) => {
    return {
        type: PICKUP,
        payload: data
    }
}

export const deliver = (data) => {
    return {
        type: DELIVER,
        payload: data
    }
}

export const removeUser = () => {
    return {
        type: LOGOUT,
    }
}