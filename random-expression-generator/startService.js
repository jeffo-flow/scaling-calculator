'use strict'
var ExpressionService = require('./expressionService.js')
var s = new ExpressionService()
var args = process.argv.slice(2);
var port = args[0]
s.start(port)