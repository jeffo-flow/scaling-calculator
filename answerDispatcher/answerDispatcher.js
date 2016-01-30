var http = require('http')
var request = require('request')
var querystring = require('qs')

AnswerDispatcher = function AnswerDispatcher()
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
                var s = expressionList[i]

                function getAnswerFrom(question) {

                    function onAnswer(answer) {
                        onFinalAnswer(answer)
                        console.log(question + answer)
                    }

                    getAnswerFromServer(onAnswer, answerService.endPoint, question)
                }

                getQuestionFromServer(getAnswerFrom, s.endPoint)
            }
        }
    }

    function getQuestionFromServer(onQuestion, endPoint){
        request(endPoint, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                onQuestion(body)
            }
        })
    }

    function getAnswerFromServer(onAnswer, endPoint, question)
    {
        var qs = querystring.stringify({ q: question})
        var fullUrl = endPoint + '?' + qs

        request(fullUrl, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                onAnswer(body)
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