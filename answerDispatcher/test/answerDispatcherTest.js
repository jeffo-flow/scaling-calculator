var AnswerDispatcher = require('../answerDispatcher.js')
var assert = require('assert')


suite('answerDispatcher', function() {

    test('addCluster', function(done) {
        var a1 = {id:1, endPoint: 'http://localhost:2323'}
        var es1 = {id:1, endPoint: 'http://localhost:4242'}
        var es2 = {id:2, endPoint: 'http://localhost:4343'}

        function onAnswer(answer)
        {
            console.log(answer)
        }

        var d = new AnswerDispatcher()
        d.addCluster(a1, [es1, es2])
        d.start(onAnswer)
        var cluster = d.getCluster(a1)
        assert.equal(true, cluster != null)
        assert.equal(cluster[0], es1)
        assert.equal(cluster[1], es2)
        done()

    })


})