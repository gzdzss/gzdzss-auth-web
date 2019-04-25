export default {

    //全局标题
    title: 'gzDzssAuth',

    //api配置
    api: {
        //请求超时时间
        timeout: 6000,
        //重试次数
        maxRedirects: 0
    },

    //存储token的key
    accessTokenKey: 'gzdzssAuthAccessToken',
    //token过期时间（秒）
    accessTokenExpiresKey: 'gzdzssAuthAccessTokenExpires'
}
