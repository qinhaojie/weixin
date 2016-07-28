
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

let app = koa()
app.use(function* (next) {
  let body = yield rawBody(this.req)
  this.req.body = body.toString()
  yield next
})
app.use(function* (next) {
  console.log(new Date())
  let signature = this.query.signature
  let nonce = this.query.nonce
  let ts = this.query.timestamp
  let echostr = this.query.echostr
  let token = config.token
  let str = [token, ts, nonce].sort().join('')
  let sha = sha1(str)
  if (this.method === "GET") {
    if (sha === signature) {
      this.body = String(echostr)
    } else {
      this.body = 'error'
    }
  } else {
    let b = this.req.body
    if (this.request.type.indexOf('xml') > 0) {
      b = yield util.parseXml2JSON(b)
      console.log(b)
      b = b.xml
      let resbody =
        `<xml>
            <ToUserName><![CDATA[${b.FromUserName[0]}]]></ToUserName>
            <FromUserName><![CDATA[${b.ToUserName[0]}]]></FromUserName>
            <CreateTime>${Date.now()-5000}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${b.Content[0].split('').reverse().join('')} ${Date.now()}]]></Content>
          </xml>`
      this.status = 200
      this.type = 'text/xml'
      this.body = resbody
      return true
    }
  }
})

app.listen(18080)

