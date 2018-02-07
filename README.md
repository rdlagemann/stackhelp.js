[![Build Status](https://travis-ci.org/rdlagemann/stackhelp.js.svg?branch=master)](https://travis-ci.org/rdlagemann/stackhelp.js)
# stackhelp.js
Hardcore StackOverflow debugging. :see_no_evil:

## What
stackhelp will throw your Error right on Stack Overflow using your default browser.

## How

First, you should  
`npm i stackhelp`  
  
example:
```javascript
const stackhelp = require('stackhelp')

function promiseFail() {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      reject('Promise will always fail')
      
    }, 500)
  })
}

// 'find' function will look for 'err' on Stack Overflow
promiseFail().catch(err => stackhelp.find(err))
```
Automatic opens your default browser with the proper stackoverflow search, can become really annoying.

## Are you here yet?

```javascript
stackhelp.off() // turns off stackhelp

stackhelp.on() // turns on stackhelp

stackhelp.toggle() // if on, turn off and vice versa

stackhelp.getStatus() // ==> 'on' or 'off'

stackhelp.url // ==> http://www.stackoverflow.com/search?q=

stackhelp.setTags([
  'NodeJs', 
  'npm'
 ]) //will add stackoverflow tags to your querie

// this is it
```
## Test
Run `npm install --only=dev`  

Then `npm test`
