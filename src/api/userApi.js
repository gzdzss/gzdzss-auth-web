import request from '@/request'
import qs from 'qs'

export const login = ({username, password}) => {
    const param = {
        'username': username,
        'password': password
    }
    return request({
        url: "/api/auth/login",
        method: 'post',
        params: param
    });
}

export const register = ({username, password}) => {
    const param = {
        'username': username,
        'password': password
    }
    return request({
        url: "/api/auth/user/register",
        method: 'post',
        params: param
    });
}

export const getUser = () => {
    return request({
        url: "/api/auth/user",
        method: 'get',
    });
}

export const logout = () => {
    return request({
        url: "/api/auth/logout",
        method: 'get',
    });
}


export const authorize = (param) => {
    return request({
        url: "/api/auth/oauth2/authorize",
        method: 'get',
        params: param
    });
}

export const authorizeApprove = (param) => {
   return request.post("/api/auth/oauth2/approve", qs.stringify(param,  {indices: false}))
}








