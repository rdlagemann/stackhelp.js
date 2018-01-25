module.exports.queryFormatter = (url, query) => {
  query = query.replace(/ /gi, '+')
  return url + query
}