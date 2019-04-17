module.exports = {
    configureWebpack: {
        devServer: {
            disableHostCheck: true,
            proxy: {
                '^/api': {
                    target: 'http://creative.cadedaniel.com:8882',
                }
            }
        },
    }
}
