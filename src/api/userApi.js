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


export const authorize = (param) => {
    return request({
        url: "/api/auth/oauth2/authorize",
        method: 'get',
        params: param
    });
}

export const authorizeApprove = (param) => {
   return request.post("/api/auth/oauth2/authorize/approve", qs.stringify(param,  {indices: false}))
}








