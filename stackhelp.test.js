const stackhelp = require('./stackhelp.js')()
const { queryFormatter } = require('./helper.js')

const url = 'http://www.stackoverflow.com/search?q='
const testErr = new Error('Test Error')

describe('Controller test', () => {  

  test('stackhelp() with no arguments return object controller', () => {
    expect(typeof stackhelp()).toBe('object')
  })

  test('stackhelp OFF, status off', () => {
    stackhelp().off()  
    expect(stackhelp().getStatus()).toBe('off')
  })

  test('stackhelp ON, status on', () => {
    stackhelp().on()
    expect(stackhelp().getStatus()).toBe('on')      
  })

  test('stackhelp TOGGLE, status off', () => {
    stackhelp().toggle()
    expect(stackhelp().getStatus()).toBe('off')
  })

  test('No tags, tag length === 0', () => {
    expect(stackhelp().setTags().length).toBe(0)
  })

  test('Add one tag, tag length === 1', () => {
    expect(stackhelp().setTags('NodeJS').length).toBe(1)
  })

  test('No tags, back to length === 0', () => {
    expect(stackhelp().setTags().length).toBe(0)      
  })
  
})

describe('Mains tasks' , () => {
  let searchString
  test('Query validation', () => {
    stackhelp().on()
    searchString = testErr.toString()
    expect(stackhelp(testErr)).toBe(queryFormatter(url, searchString))    
  })

  test('Query validation with tags', () => {   
    stackhelp().on() 
    searchString = testErr.toString() + stackhelp().setTags('NodeJS', 'npm').join()
    expect(stackhelp(testErr)).toBe(queryFormatter(url, searchString))    
  })
})
