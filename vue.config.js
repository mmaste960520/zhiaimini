const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        fly: path.resolve(__dirname, './src/utils/request.js')
      }
    }
  }
}
