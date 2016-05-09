var express = require('express')
var app = express()
var expressMiddlewareElapsedtime = require('../')

app.use(expressMiddlewareElapsedtime({
  key: 'customKKK',
  handler: function (err, req, res) {
    console.log(err)
    console.log(req['customKKK'])
  }
}))

app.get('/', function (req, res, next) {
  setTimeout(next, 100)
}, function (req, res, next) {
  setTimeout(next, 5000)
}, function (req, res, next) {
  next()
}, function (req, res, next) {
  res.json({ok: true})
})

app.listen(8000)
