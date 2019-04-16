module.exports = {
    configureWebpack: {
        devServer: {
            disableHostCheck: true,
            proxy: {
                '^/api': {
                    target: 'http://cadedaniel.com:8888',
                }
            }
        },
    }
}
