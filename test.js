const Promise = require('./index.js')

Promise.deferred = function() {
  const obj = {}

  obj.promise = new Promise(function(resolve, reject) {
    obj.resolve = resolve
    obj.reject = reject
  })

  return obj
}

module.exports = Promise
