
let wxConfig = require('../../config/wx')
let wexinMiddleware = require('co-wechat')(wxConfig.config.token)
let WxApi = require('co-wechat-api')
let wxapi = new WxApi(wxConfig.config.appId, wxConfig.config.appsecret)

exports.reply = function () {
  return wexinMiddleware.middleware(function* (next) {
    let message = this.weixin
    message.timer = new Date()
    this.body = {
      type: 'text',
      content: JSON.stringify(message)
    }
  })
}

exports.updateMenu = function () {
  return function* (next) {
    yield * wxapi.removeMenu()
    yield * wxapi.createMenu(wxConfig.menu)
    yield * wxapi.getMenu()
    this.body = 'cg'
  }
}

exports.auth = function* (next) {
  if (this.query.a !== '1') {
    this.throw(404, 'auth')
    return
  }
  yield * next
}

