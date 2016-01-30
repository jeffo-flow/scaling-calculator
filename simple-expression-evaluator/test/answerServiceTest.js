var AnswerService = require('../answerService.js')
var assert = require('assert')
var http = require('http')
var querystring = require('querystring')
var request = require('request')

suite('answerService', function() {

    test('serves up expressions', function(done) {
        var service = new AnswerService()
        service.start(2323);

        var question = '100*25='
        console.log('question: '+ question)
        var qs = querystring.stringify({ q: question})

        request('http://localhost:2323/?'+qs, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('answer: ' + body)
                done()
            }
        })
    })


})