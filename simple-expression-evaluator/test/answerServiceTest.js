var AnswerService = require('../answerService.js')
var assert = require('assert')
var http = require('http')
var querystring = require('querystring')
var request = require('request')

suite('answerService', function() {

    test('answers questions when formatted properly', function(done) {
        var service = new AnswerService()
        service.start(2323);

        var question = '100*25='
        var qs = querystring.stringify({ q: question})

        request('http://localhost:2323/?'+qs, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(body,2500)
                done()
            }
        })
    })

    test('answers with error message when question is invalid format', function(done) {
        var service = new AnswerService()
        service.start(2121);

        var question = '42 is the best number'
        var qs = querystring.stringify({ q: question})

        request('http://localhost:2121/?'+qs, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(body, 'Error: could not calculate the answer for /?q=42%20is%20the%20best%20number')
                done()
            }
        })
    })

    test('answers with blank message when missing query', function(done) {
        var service = new AnswerService()
        service.start(2020);

        request('http://localhost:2020/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(body, '')
                done()
            }
        })
    })


})