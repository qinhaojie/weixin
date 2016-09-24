'use strict'
let koa = require('koa')

// let co = require('co')
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/qin'
// MongoClient.connect(url, (e, db) => {
//   if (e) throw e
//   global.db = db
// })
let router = require('./router')
let app = koa()

app.use(function * (next) {
  let s = new Date()
  yield next
  let e = new Date()
  console.log(e, e - s)
  console.log(this.body)
})

app.use(function * (next) {
  try {
    yield next
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    this.status = err.status || 500
    this.type = 'html'
    this.body = String(err)
  }
})

app

router(app)

app.listen(18080)
