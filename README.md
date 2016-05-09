# express-middleware-elapsedtime

[![Build Status](https://travis-ci.org/isayme/express-middleware-elapsedtime.svg?branch=master)](https://travis-ci.org/isayme/express-middleware-elapsedtime)
[![Coverage Status](https://coveralls.io/repos/github/isayme/express-middleware-elapsedtime/badge.svg?branch=master)](https://coveralls.io/github/isayme/express-middleware-elapsedtime?branch=master)
[![npm](https://img.shields.io/npm/v/express-middleware-elapsedtime.svg?maxAge=2592000)](https://travis-ci.org/isayme/express-middleware-elapsedtime)
[![npm](https://img.shields.io/npm/l/express-middleware-elapsedtime.svg?maxAge=2592000)](https://travis-ci.org/isayme/express-middleware-elapsedtime)

[![NPM](https://nodei.co/npm/express-middleware-elapsedtime.png)](https://nodei.co/npm/express-middleware-elapsedtime/)

Record each express middleware elapsed time.

# Install
> npm i --save express-middleware-elapsedtime

# Usage

````
var express = require('express')
var app = express()

var expressMiddlewareElapsedtime = require('express-middleware-elapsedtime')

// it's truly recommend enable this middleware only in developing envrionment
if (process.env.NODE_ENV !== 'production') {
  app.use(expressMiddlewareElapsedtime())
}
````

# API
> var expressMiddlewareElapsedtime = require('express-middleware-elapsedtime')


## expressMiddlewareElapsedtime(options)

### Options
Options for this middleware.

#### key
The key for data saved, defaults to `_elapsedtimes`.

#### hanlder (err, req, res)
When a request done, this handler will called.

All middleware elapsed time will save at `req._elapsedtimes` by default.

````
app.use(expressMiddlewareElapsedtime({
  key: 'yourCustomkey',
  hanlder: function (err, req, res) {
    console.log(req.yourCustomkey)
  }
}))
````
