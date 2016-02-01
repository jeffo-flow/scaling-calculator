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
    setInterval(dispatch, 10)

    function dispatch()
    {
        for (var answerService of self.clusterMap.keys()) {
            var expressionList = self.clusterMap.get(answerService)

            for(var i=0; i<expressionList.length; i++)
            {
                var es = expressionList[i]
                var c = {as: answerService.endPoint, es: es.endPoint}

                question(c).then(answer).then(logResult).catch(error)
            }
        }
    }

    function logResult (answer) {
        onFinalAnswer()
        console.log(answer)
    }

    function error(error) {
        console.log('Error: something went wrong in the answer dispatcher.', error);
    }

    function question(config) {
        var question = new Promise(function (resolve, reject) {
            getQuestionFromServer(resolve, reject, config)
        })
        return question
    }

    function answer(question) {
        var answer = new Promise(function (resolve, reject) {
            getAnswerFromServer(resolve, reject, question.config.as, question.value)
        })
        return answer
    }

    function getQuestionFromServer(resolve, reject, config){
        request(config.es, function questionRequestHandler(error, res, body) {
            if (!error && res.statusCode == 200) {
                var question = body
                resolve({value:question, config:config})
            }
            else
            {
                reject('could not get the question from the expression server')
            }
        })
    }

    function getAnswerFromServer(resolve, reject, endPoint, question)
    {
        var qs = querystring.stringify({ q: question})
        var fullUrl = endPoint + '?' + qs

        request(fullUrl, function answerRequestHandler(error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(question + body)
            }
            else
            {
                reject('could not get the answer from the answer service')
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