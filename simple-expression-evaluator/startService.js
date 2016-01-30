'use strict'
var AnswerService = require('./answerService.js')
var s = new AnswerService()
var args = process.argv.slice(2);
var port = args[0]
s.start(port)