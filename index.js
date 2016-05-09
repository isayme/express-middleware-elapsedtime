var express = require('express')
var Route = express.Route
var methods = require('methods')
var flatten = require('array-flatten')
var onFinished = require('on-finished')

var noop = function () {}

var slice = Array.prototype.slice

function wrapHandler (key, handle) {
  return function (req, res, next) {
    var now = Date.now()
    req[key] = req[key] || []
    req[key].push({
      now: now
    })
    handle.apply(this, arguments)
  }
}

function expressMiddlewareElapsedtime (options) {
  options = options || {}

  var key = options.key || '_elapsedtimes'
  var handler = options.handler || noop

  methods.forEach(function (method) {
    var routeMethod = Route.prototype[method]
    Route.prototype[method] = function () {
      var handles = flatten(slice.call(arguments))
      handles = handles.map(function (handle) {
        return wrapHandler(key, handle)
      })
      routeMethod.call(this, handles)
    }
  })

  return function (req, res, next) {
    onFinished(res, function (err, res) {
      handler(err, req, res)
    })
    next()
  }
}

module.exports = expressMiddlewareElapsedtime
