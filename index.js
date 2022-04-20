function Promise(executor) {
  // 2.1 Promise 的状态
  // Promise 必须处于以下三种状态之一： pending、fulfilled 或者 rejected
  this.state = 'pending'
  // 2.2.6.1. 如果 promise 处于 fulfilled 状态，所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用来执行
  this.onFulfilledCallbacks = []
  // 2.2.6.2. 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用来执行
  this.onRejectedCallbacks = []

  const self = this

  function resolve(value) {
    setTimeout(function() {
      // 2.1.1 当 Promise 处于 pending 状态时：
      // 2.1.1.1 可以转换到 fulfilled 或者 rejected 状态
      // 2.1.2 当 Promise 处于 fulfilled 状态时：
      // 2.1.2.1 不得过渡到任何其他状态
      // 2.1.2.2 必须有一个不能改变的值
      if (self.state === 'pending') {
        self.state = 'fulfilled'
        self.data = value
        // 2.2.6.1. 如果 promise 处于 fulfilled 状态，所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用来执行
        for (let i = 0; i < self.onFulfilledCallbacks.length; i++) {
          self.onFulfilledCallbacks[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() {
      // 2.1.1 当 Promise 处于 pending 状态时：
      // 2.1.1.1 可以转换到 fulfilled 或者 rejected 状态
      // 2.1.3 当 Promise 处于 rejected 状态时：
      // 2.1.2.1 不得过渡到任何其他状态
      // 2.1.2.2 必须有一个不能改变的值
      if (self.state === 'pending') {
        self.state = 'rejected'
        self.date = reason
        // 2.2.6.2. 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用来执行
        for (let i = 0; i < self.onRejectedCallbacks.length; i++) {
          self.onRejectedCallbacks[i](reason)
        }
      }
    })
  }

  // 补充说明：用户传入的函数可能也会执行异常，所以这里用 try...catch 包裹
  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}



module.exports = Promise
