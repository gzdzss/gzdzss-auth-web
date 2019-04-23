import axios from 'axios'
import config from '@/config'
import store from '@/store'
import {clearStorageToken, getAccessTokenExpires, getStorageAccessToken} from "@/util";

const {api} = config;

const service = axios.create({
    timeout: api.timeout,
    maxRedirects: api.maxRedirects
})

service.interceptors.request.use(function (config) {
    if (getStorageAccessToken()) {
        const accessTokenExpires = getAccessTokenExpires();
        //当前时间秒 + 5分钟 ,(提前五分钟刷新)
        const curTimeSecond = new Date().getTime() / 1000;
        //如果存在 可刷新的token,过期时间，   并且  当前时间 大于过期时间 , 清空
        if (curTimeSecond > accessTokenExpires) {
            clearStorageToken();
        } else {
            config.headers.common['Authorization'] = getStorageAccessToken()
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
service.interceptors.response.use(
    function (response) {
        return Promise.resolve(response)
    },
    function (e) {
        if (e && e.response) {
            let statusText = '';
            if (e.response.data && e.response.data.error_description) {
                statusText = e.response.data.error_description
            } else if (e.response.data && e.response.data.message){
                statusText = e.response.data.message;
            } else {
                statusText = e.response.statusText
            }
            const error = {
                hasError: true,
                status: e.response.status,
                statusText: statusText
            }
            store.commit('ON_HTTP_ERROR', error)
            if (e.response.status === 401) {
                store.commit('clearToken');
            }
        } else if (e && e.message) {
            const error = {
                hasError: true,
                status: 'invoke error',
                statusText: e.message
            }
            store.commit('ON_HTTP_ERROR', error)
        }
        return Promise.reject(e)
    }
)

export default service