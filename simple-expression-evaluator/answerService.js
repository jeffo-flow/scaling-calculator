var ExpressionEvaluator = require('./evaluator.js')
var connect = require('connect')
var connectApp = connect()
var url = require('url')


AnswerService = function AnswerService()
{
}

AnswerService.prototype.start = function start(port)
{
    connectApp.use(this.answerHandler)
    connectApp.listen(port)
}

AnswerService.prototype.answerHandler = function answerHandler(req, res, next)
{
    var p = url.parse(req.url, true)
    var question = p.query['q']
    var evaluator = new ExpressionEvaluator();
    var answer = evaluator.answer(question)
    res.end(answer)
    next()
}

AnswerService.prototype.go = function go(expression)
{
    var evaluator = new ExpressionEvaluator();
    return evaluator.go(expression)
}

module.exports = AnswerService

