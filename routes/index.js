module.exports = (app) => {
  require('./api.author')(app)
  require('/api.book')(app)
}
