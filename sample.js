const stackhelp = require('./stackhelp')()

stackhelp().setTags('nodejs', 'javascript')

stackhelp(new Error('Variable not found'))