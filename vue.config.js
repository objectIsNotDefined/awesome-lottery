// vue.config.js
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'Awesome Lottery'
        return args
      })
  }
}