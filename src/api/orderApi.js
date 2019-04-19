import request from '@/request'

export const list = () => {

    return request({
        url: "/api/order/api/order/list",
        method: 'get',
    });
}

