
'use strict'
let koa = require('koa')
// let body = require('co-body')
let rawBody = require('raw-body')
let sha1 = require('sha1')
let util = require('./lib/util')
let config = {
  appId: 'wx6f588d7ba5cac142',
  appsecret: 'b979d6f620b34e18503dc6f98d5515f5',
  token: 'abcd123456'
}
let WxApi = require('co-wechat-api')
let wexinMiddleware = require('co-wechat')(config.token)

let wxapi = new WxApi(config.appId, config.appsecret)
let co = require('co')
let menu = {
  'button': [
    {
      'name': '排行榜',
      'sub_button': [
        {
          'name': '最热的',
          'type': 'click',
          'key': 'movie_hot'
        },
        {
          'name': '最冷的',
          'type': 'view',
          'url': 'http://baidu.com'
        }
      ]
    },
    {
      'name': '分类',
      'sub_button': [
        {
          'name': '拍照',
          'type': 'pic_photo_or_album',
          'key': 'pic'
        },
        {
          'name': '发送位置',
          'type': 'location_select',
          'key': 'location_select'
        },
        {
          name: '微信相册',
          type: 'pic_weixin',
          key: 'pic_weixin'
        },
        {
          name: '扫码',
          type: 'scancode_push',
          key: 'scancode_push'
        }
      ]
    },
    {
      'name': '帮助',
      'type': 'click',
      'key': 'help'
    }]
}

let app = koa()

function init() {
  co(function* () {
    let res = yield* wxapi.removeMenu()
    console.log(res)
    let a = yield* wxapi.createMenu(menu)
    console.log(a)
    a = yield* wxapi.getMenu()
    console.log(a)
  }).catch(e => {
    console.log(e)
  })
}
// init()

app.use(wexinMiddleware.middleware(function* () {
  let message = this.weixin
  console.log(message)
  this.body = {
    type: 'text',
    content: JSON.stringify(message)
  }
}))

app.listen(18080)

