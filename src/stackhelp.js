const { exec } = require('child_process')
const { queryFormatter } = require('./helper.js')

// map OS and respective commands to open default browser
const osCommand = {
  'win32': 'start "" ',
  'linux': 'xdg-open ',
  'darwin': 'open '
}

const url = 'http://www.stackoverflow.com/search?q='
let isActive = true
let tags = []

// test OS when required
;(function() {
  if(! (process.platform in osCommand)) {
    throw new Error('STACKHELP.JS does not work for your operational system.')
  }
})()

const on = () => isActive = true 
const off = () => isActive = false 
const toggle = () => isActive = isActive ? false : true
const getStatus = () => isActive ? 'on' : 'off' 
const setTags = (arr) => { 
  if(!arr || arr.length === 0) {
    tags = []
  } else {
    ;[].forEach.call(arr, e => {
      if(typeof e !== 'string'){
        throw new TypeError('Tags must be strings')
      }
    })
    tags.push(...arr) 
    tags = tags.map(e => '[' + e + ']')
  }  

  return tags      
}

const find = (err) => {
  if(!isActive) return '[LOG]: stackhelp is off'
  
  const query = queryFormatter(url, err.toString() + ' ' + tags.join(' '))
  
  // runs command to open stack overflow on default browser
  exec(osCommand[process.platform] + query, (err) => {
    if(err) return console.log(err)
  })

  return query
}


module.exports = {
  on,
  off,
  toggle,
  getStatus,
  setTags,
  url,
  find
}
