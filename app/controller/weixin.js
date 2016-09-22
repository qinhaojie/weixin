'use strict'
let wxConfig = require('../../config/wx')
let wexinMiddleware = require('co-wechat')(wxConfig.config.token)
let WxApi = require('co-wechat-api')
let wxapi = new WxApi(wxConfig.config.appId, wxConfig.config.appsecret)
let spider = require('./spider')
exports.reply = function () {
  return wexinMiddleware.middleware(function * (next) {
    let message = this.weixin
    if (message.MsgType === 'event') {
      if (message.Event === 'CLICK') {
        return yield handleClickEvent.call(this, message)
      }
    }
  })
}

exports.updateMenu = function () {
  return function * (next) {
    yield * wxapi.removeMenu()
    yield * wxapi.createMenu(wxConfig.menu)
    yield * wxapi.getMenu()
    this.body = 'cg'
  }
}

exports.auth = function * (next) {
  yield * next
}

function * handleClickEvent (message) {
  switch (message.EventKey) {
    case 'football':
    case 'basketball':
      let info = yield spider.getSportMatch(message.EventKey)
      let res = ''
      for (let match of info) {
        res += `${match.time} ${match.event} ${match.host} : ${match.guest}\n`
      }
      this.body = {
        type: 'text',
        content: res
      }
      break
    default:
      break
  }
}
