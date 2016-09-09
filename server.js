'use strict'
let koa = require('koa')

// let co = require('co')


let router = require('./router')
let app = koa()
router(app)
// function init() {
//   co(function* () {
//     let res = yield* wxapi.removeMenu()
//     console.log(res)
//     let a = yield* wxapi.createMenu(wxConfig.menu)
//     console.log(a)
//     a = yield* wxapi.getMenu()
//     console.log(a)
//   }).catch(e => {
//     console.log(e)
//   })
// }
// init()


app.listen(18080)
