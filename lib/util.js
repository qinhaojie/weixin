'use strict'
let xml2js = require('xml2js')

exports.parseXml2JSON = function (xmlString) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlString, (e, js) => {
      if (e) return reject(e)
      resolve(js)
    })
  })
}
