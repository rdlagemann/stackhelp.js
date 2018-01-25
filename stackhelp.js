const { exec } = require('child_process')

const url = 'http://www.stackoverflow.com/search?q='

// maping OS and respective commands to open default browser
const osCommand = {
  'win32': 'start "" ',
  'linux': 'xdg-open ',
  'darwin': 'open '
}

;(function() {
  if(! (process.platform in osCommand)) {
    throw new Error('STACKHELP.JS does not work for your operational system.')
  }
})()

module.exports = () => {
  let isActive = true
  let tags = []
  
  function on() { isActive = true }
  function off() { isActive = false }
  function toggle() { isActive = isActive ? false : true}
  function setTags() { 
    [].forEach.call(arguments, e => {
      if(typeof e !== 'string'){
        throw new TypeError('Tags must be strings')
      }
    })
    tags.push(...arguments) 
    tags = tags.map(e => '[' + e + ']')
    
  }
  
  return function(err) {
    if(!err) {      
      return {
        on,
        off,
        toggle,
        setTags
      }

    }

    if(!isActive) return void 0

    const errQuery = (err.toString() + tags.join()).replace(/ /gi, '+'),
          query = osCommand[process.platform] + url + errQuery

    exec(query, (err) => {
      if(err) return console.log(err)
    })
  }
}
