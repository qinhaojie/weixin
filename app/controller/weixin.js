
let wxConfig = require('../../config/wx')
let wexinMiddleware = require('co-wechat')(wxConfig.config.token)
let WxApi = require('co-wechat-api')
let wxapi = new WxApi(wxConfig.config.appId, wxConfig.config.appsecret)

module.exports = function () {
  return wexinMiddleware.middleware(function* (next) {
    let message = this.weixin
    
    this.body = {
      type: 'text',
      content: JSON.stringify(message)
    }
  })
}
