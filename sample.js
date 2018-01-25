const stackhelp = require('./stackhelp')()

function promiseFail() {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      reject('Promise will always fail')
      
    }, 500)
  })
}

// will look for 'err' on Stack Overflow
promiseFail().catch(err => stackhelp(err))