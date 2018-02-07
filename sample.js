const stackhelp = require('./src/stackhelp')

console.log(stackhelp)

function promiseFail () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Promise will always fail')
    }, 500)
  })
}

// will look for 'err' on Stack Overflow
promiseFail().catch(err => stackhelp.find(err))
