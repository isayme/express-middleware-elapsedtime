/* global describe, it */

var express = require('express')
var expect = require('chai').expect
var request = require('supertest')

var expressMiddlewareElapsedtime = require('../')

describe('expressMiddlewareElapsedtime', function () {
  describe('initialize', function () {
    it('should work normal after app.use', function (done) {
      var app = express()
      app.use(expressMiddlewareElapsedtime())
      app.get('/', function (req, res, next) {
        res.json({ok: true})
      })
      request(app)
        .get('/')
        .expect(200, done)
    })

    it('custom key/handler', function (done) {
      var app = express()
      var key = 'customKey'
      app.use(expressMiddlewareElapsedtime({
        key: key,
        handler: function (err, req, res) {
          expect(err).to.be.null
          expect(res.statusCode).to.be.equal(200)
          expect(req[key].length).to.be.equal(3)
          done()
        }
      }))
      app.get('/', function (req, res, next) {
        setTimeout(next, 100)
      }, function (req, res, next) {
        setTimeout(next, 500)
      }, function (req, res, next) {
        res.json({ok: true})
      })
      request(app)
        .get('/')
        .expect(200)
        .end()
    })
  })
})
