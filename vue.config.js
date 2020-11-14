let publicPath
if (process.env.NODE_ENV === 'development') {
  process.env.VUE_APP_API_URL = 'http://127.0.0.1:5001/api/v0/'
  publicPath = '/'
} else {
  process.env.VUE_APP_API_URL = 'https://acme.us.dev.activeprime.dev/api/v0/'
  publicPath = '/demo/webui/dist/'
}

process.env.VUE_APP_BASE_URL = publicPath

module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.module.rules.delete('eslint')
  },
  publicPath
}
