'use strict'

var request = require('request')
var querystring = require('qs')

var AnswerDispatcher = function AnswerDispatcher()
{
    this.clusterMap = new Map()
}

AnswerDispatcher.prototype.start = function start(onFinalAnswer)
{
    var self = this
    setInterval(go, 10)

    function go()
    {
        for (var answerService of self.clusterMap.keys()) {
            var expressionList = self.clusterMap.get(answerService)

            for(var i=0; i<expressionList.length; i++)
            {
                var es = expressionList[i]
                getQuestion(getAnswer, es.endPoint, answerService.endPoint)
            }
        }
    }

    function onAnswer(answer, question) {
        onFinalAnswer(answer)
        console.log(question + answer)
    }

    function getAnswer(question, asEndPoint) {

        getAnswerFromServer(onAnswer, asEndPoint, question)
    }

    function getQuestion(onQuestion, esEndPoint, asEndPoint){
        request(esEndPoint, function questionRequestHandler(error, res, body) {
            if (!error && res.statusCode == 200) {
                var question = body
                onQuestion(question, asEndPoint)
            }
        })
    }

    function getAnswerFromServer(onAnswer, endPoint, question)
    {
        var qs = querystring.stringify({ q: question})
        var fullUrl = endPoint + '?' + qs

        request(fullUrl, function answerRequestHandler(error, res, body) {
            if (!error && res.statusCode == 200) {
                onAnswer(body, question)
            }
        })
    }

}

AnswerDispatcher.prototype.addCluster = function addCluster(answerService, expressionServiceList)
{
    this.clusterMap.set(answerService, expressionServiceList)
}

AnswerDispatcher.prototype.getCluster = function getCluster(answerService)
{
    return this.clusterMap.get(answerService)
}

module.exports = AnswerDispatcher