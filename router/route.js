let weixin = require('./../app/controller/weixin')
let spider = require('./../app/controller/spider')
module.exports = function (router) {
  router.get('/', function * () {
    let db = global.db
    let collection = db.collection('a')
    if (Object.keys(this.query).length > 0) {
      yield collection.insertOne(this.query)
    }
    let res = yield collection.find().toArray()
    this.body = JSON.stringify(res)
  })

  router.get('/wx', weixin.reply())
  router.post('/wx', weixin.reply())
  router.use('/wx/menu', weixin.auth)
  router.get('/wx/menu', weixin.updateMenu())

  router.get('/football', function * () {
    let info = yield spider.getFootballMatch()
    this.body = JSON.stringify(info)
  })
}
