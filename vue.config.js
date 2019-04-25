module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:7001/',
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}
