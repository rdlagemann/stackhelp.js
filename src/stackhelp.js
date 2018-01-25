const { exec } = require('child_process')
const { queryFormatter } = require('./helper.js')

// map OS and respective commands to open default browser
const osCommand = {
  'win32': 'start "" ',
  'linux': 'xdg-open ',
  'darwin': 'open '
}

// test OS when required
;(function() {
  if(! (process.platform in osCommand)) {
    throw new Error('STACKHELP.JS does not work for your operational system.')
  }
})()

module.exports = () => {
  const url = 'http://www.stackoverflow.com/search?q='
  let isActive = true
  let tags = []
  
  // controls stackhelp internal states and display some properties
  const controller = {
    on: function on() { isActive = true },
    off: function off() { isActive = false },
    toggle: function toggle() { isActive = isActive ? false : true},
    getStatus: function getStatus() { return isActive ? 'on' : 'off' },
    setTags: function setTags() { 
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
  }

  return function(err) {
    if(!err) {      
      return controller
    }
    
    if(!isActive) return '[LOG]: stackhelp is off'
    
    const query = queryFormatter(url, err.toString() + ' ' + tags.join(' '))
    
    // runs command to open stack overflow on default browser
    exec(osCommand[process.platform] + query, (err) => {
      if(err) return console.log(err)
    })

    return query
  }
}
