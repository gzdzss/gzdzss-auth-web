import config from '@/config'


const {accessTokenExpiresKey, refreshTokenKey, accessTokenKey} = config;

export const setStorageToken = (payload) => {
    //保存  accessToken
    if (payload && payload.access_token && payload.token_type) {
        const token = jointAccessToken(payload);
        localStorage.setItem(accessTokenKey, token)
    }
    //保存  refresh_token
    if (payload && payload.refresh_token) {
        localStorage.setItem(refreshTokenKey, payload.refresh_token)
    }
    //保存  过期时间
    if (payload && payload.expires_in) {
        const tokenExpires = (new Date().getTime() / 1000) + payload.expires_in;
        localStorage.setItem(accessTokenExpiresKey, tokenExpires)
    }
}


export const jointAccessToken = (payload) => {
    return  payload.token_type + " " + payload.access_token;
}


export const getStorageAccessToken = () => {
    return localStorage.getItem(accessTokenKey)
}

export const getStorageRefreshToken = () => {
    return localStorage.getItem(refreshTokenKey)
}

export const getAccessTokenExpires = () => {
    return localStorage.getItem(accessTokenExpiresKey)
}


//清空存储的token
export const clearStorageToken = () => {
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
    localStorage.removeItem(accessTokenExpiresKey)
}


