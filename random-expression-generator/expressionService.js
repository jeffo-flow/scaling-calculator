var ExpressionGenerator = require('./generator.js')
var connect = require('connect')
var connectApp = connect()

ExpressionService = function ExpressionService()
{
}

ExpressionService.prototype.start = function start(port)
{
    var expressionService = this

    function handler(req, res, next)
    {
        res.end(expressionService.getExpression())
        next()
    }

    connectApp.use(handler);
    connectApp.listen(port);

}

ExpressionService.prototype.getExpression = function getExpression()
{
    var gen = new ExpressionGenerator()
    var result =  gen.randomExpression()
    return result
}

module.exports = ExpressionService

