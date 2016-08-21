let co = require('co')
co(function* () {
  let a = yield *ab()
  console.log(a)
}).catch(e => {
  console.log(e)
})

function* ab() {
  yield [12,3]
  yield [12]
  return yield new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(15)
    }, 500)
  })
}
