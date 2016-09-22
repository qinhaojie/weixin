'use strict'
let Router = require('koa-router')
let route = require('./route')
module.exports = function (app) {
  let router = new Router()
  route(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
