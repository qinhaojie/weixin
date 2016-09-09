module.exports = function (router) {

  router.get('/', function * () {
    this.body = 'asdf'
  })

  router.get('/wx', require('././../app/controller/weixin')())
  router.post('/wx', require('././../app/controller/weixin')())
}