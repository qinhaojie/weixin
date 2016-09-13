let request = require('request')
let cheerio = require('cheerio')
let moment = require('moment')
exports.getFootballMatch = function * (date) {
  let url = 'http://www.zhibo8.cc/'
  let data = yield http({url})
  let $ = cheerio.load(data.body)
  let ret = []
  $('.content').eq(0).find('li[label*="足球"]').each((i, li) => {
    let info = $(li).text().split(' ')
    let j = -1
    let r = []
    while (true) {
      j++
      if (!info[j] || info[j] === '-') continue
      r.push(info[j])
      if (r.length === 4) {
        break
      }
    }
    ret.push({
      time: r[0],
      event: r[1],
      host: r[2],
      guest: r[3]
    })
  })
  return ret
}

function http (options) {
  return new Promise((resolve, reject) => {
    request(options, (e, data) => {
      if (e) {
        reject(e)
      } else {
        resolve(data)
      }
    })
  })
}
