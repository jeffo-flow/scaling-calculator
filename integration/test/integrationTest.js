var AnswerDispatcher = require('../../answerDispatcher/answerDispatcher.js')
var AnswerService = require('../../simple-expression-evaluator/answerService.js')
var ExpressionService = require('../../random-expression-generator/expressionService.js')
var assert = require('assert')


suite('end to end integration', function() {

    function startServers()
    {
        var a0 = new AnswerService()
        a0.start(2020)

        var es0 = new ExpressionService()
        es0.start(4040)

        var es1 = new ExpressionService()
        es1.start(4141)

        var es2 = new ExpressionService()
        es2.start(4242)
    }

    suiteSetup(function(){
        startServers()
    })


    test('get some answers and perf measurements', function(done) {

        var a0 = {id:1, endPoint: 'http://localhost:2020/'}
        var es0 = {id:1, endPoint: 'http://localhost:4040/'}
        var es1 = {id:2, endPoint: 'http://localhost:4141/'}
        var es2 = {id:2, endPoint: 'http://localhost:4242/'}

        this.timeout(1000);


        var count = 0
        var isDone = false

        function onAnswer()
        {
            count+=1
            if(count > 30) {
                if(!isDone) {
                    isDone = true
                    done()
                    var end = new Date() - start
                    var requestPerSecond = count / (end / 1000.0)
                    assert.equal(true, requestPerSecond > 3.0, "failed to meet min load of 1 request per second per producer connected")
                    console.log('\r\nrps:' + requestPerSecond + '\r\n')
                    return
                }
            }
        }

        var d = new AnswerDispatcher()
        d.addCluster(a0, [es0,es1,es2])

        var start = new Date();
        d.start(onAnswer)

    })


})