const { exec } = require('child_process')
const { queryFormatter } = require('./helper.js')

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
  const url = 'http://www.stackoverflow.com/search?q='
  let isActive = true
  let tags = []
  
  function on() { isActive = true }
  function off() { isActive = false }
  function toggle() { isActive = isActive ? false : true}
  function getStatus() { return isActive ? 'on' : 'off' }
  function setTags() { 
    if(arguments.length === 0) {
      tags = []
    } else {
      [].forEach.call(arguments, e => {
        if(typeof e !== 'string'){
          throw new TypeError('Tags must be strings')
        }
      })
      tags.push(...arguments) 
      tags = tags.map(e => '[' + e + ']')
    }
    
    return tags
    
  }

  const controller = {
    url,
    on,
    off,
    toggle,
    getStatus,
    setTags
  }
  
  return function(err) {
    if(!err) {      
      return controller
    }
    
    if(!isActive) return '[LOG]: stackhelp is off'
    
    const query = queryFormatter(url, err.toString() + ' ' + tags.join(' '))
  
    exec(osCommand[process.platform] + query, (err) => {
      if(err) return console.log(err)
    })

    return query
  }
}
