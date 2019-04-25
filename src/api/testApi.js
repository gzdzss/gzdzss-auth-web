import request from '@/request'

export const test = () => {
    return request({
        url: "/api/auth/test",
        method: 'get'
    });
}


export const adminTest = () => {
    return request({
        url: "/api/auth/adminTest",
        method: 'get'
    });
}


export const testLogin = () => {
    return request({
        url: "/api/auth/testLogin",
        method: 'get'
    });
}
