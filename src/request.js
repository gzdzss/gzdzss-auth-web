import axios from 'axios'
import config from '@/config'
import store from '@/store'
import {refreshToken} from '@/api/userApi'
import {
    getAccessTokenExpires,
    getStorageAccessToken,
    getStorageRefreshToken
} from "@/util";

const {api} = config;

const service = axios.create({
    timeout: api.timeout,
    maxRedirects: api.maxRedirects
})

service.interceptors.request.use(function (config) {
    if (getStorageAccessToken()) {
        const accessTokenExpires = getAccessTokenExpires();
        //当前时间秒 + 5分钟 ,(提前五分钟刷新)
        const curTimeSecond = new Date().getTime() / 1000 + 60 * 5;
        //如果存在 可刷新的token,过期时间，   并且  当前时间 大于过期时间
        if (curTimeSecond > accessTokenExpires) {
            return new Promise((resolve, reject) => {
                //获取当前刷新token
                const storageRefreshToken = getStorageRefreshToken();
                //清空当前的Token
                //clearStorageToken();
                store.commit('clearToken')
                //调用接口刷新
                refreshToken(storageRefreshToken).then(res => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            }).then((res) => {
                //更新token
                //setStorageToken(res.data)
                store.commit('setToken', res.data)
                config.headers.common['Authorization'] = getStorageAccessToken();
                return config;
            }).catch(() => {
                return config;
            })
        }
        config.headers.common['Authorization'] = getStorageAccessToken()
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
            if (e.response.data &&  e.response.data.error_description) {
                statusText =  e.response.data.error_description
            } else {
                statusText = e.response.statusText
            }
            const error = {
                hasError: true,
                status: e.response.status,
                statusText: statusText
            }
            store.commit('ON_HTTP_ERROR', error)
        }
        return Promise.reject(e)
    }
)

export default service