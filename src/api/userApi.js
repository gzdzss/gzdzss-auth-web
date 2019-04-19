import request from '@/request'
import config from '@/config'

const {oauth2client} = config

export const login = ({username, password}) => {
    const param = {
        'grant_type': 'password',
        'username': username,
        'password': password,
        'scope': 'login userinfo'
    }
    return request({
        url: "/api/auth/oauth/token",
        method: 'post',
        params: param,
        auth: oauth2client
    });
}

export const logout = () => {
    return request({
        url: "/api/auth/revoke",
        method: 'post'
    });
}


export const refreshToken = (refresh_token) => {
    const param = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    }
    return request({
        url: "/api/auth/oauth/token",
        method: 'post',
        params: param,
        auth: oauth2client
    });
}





