
var koa = require('koa');
// var body = require('co-body')
var rawBody = require('raw-body');
var sha1 = require('sha1');
var config = {
    appId: 'wx6f588d7ba5cac142',
    appsecret: 'b979d6f620b34e18503dc6f98d5515f5',
    token: 'abcd123456'
}


var app = new koa();
app.use(function* (next) {
    return this.body = 'asdfasdfasdf';
   console.log(new Date())
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var ts = this.query.timestamp;
    var echostr = this.query.echostr;
    var token = config.token
    var str = [token, ts, nonce].sort().join('');
    var sha = sha1(str);
    if (this.method === "GET") {
        if (sha === signature) {
            this.body = echostr + '';
        } else {
            this.body = 'error';
        }
    }else{
     var b = yield rawBody(this.req);
     console.log(b.toString())
    }

})
app.listen(18080)

