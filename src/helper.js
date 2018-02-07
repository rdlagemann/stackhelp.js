module.exports.queryFormatter = (url, query) => {
  query = query.trim().replace(/ /gi, '+')
  return url + query
}
