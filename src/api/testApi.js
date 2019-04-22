import request from '@/request'

export const test = () => {
    return request({
        url: "/api/auth/test",
        method: 'get'
    });
}



