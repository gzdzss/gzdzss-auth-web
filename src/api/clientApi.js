import request from '@/request'

export const list = () => {
    return request({
        url: "/api/auth/client/list",
        method: 'get'
    });
}


export const detail = (id) => {
    return request({
        url: "/api/auth/client/detail/" + id,
        method: 'get'
    });
}


export const register = (param) => {
    return request({
        url: "/api/auth/client/register",
        method: 'post',
        params: param
    });
}
