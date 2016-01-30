var Random = require('random-js')

function ExpressionGenerator() {

    this.maxInt = Number.MAX_SAFE_INTEGER
    mt = Random.engines.mt19937()
    mt.autoSeed()
    this.mt = mt

    this.operators = ['+','-','/','*','%']
}

ExpressionGenerator.prototype.randomInteger = function randomInteger() {
    var int = Random.integer(0, this.maxInt)(this.mt)
    return int
}

ExpressionGenerator.prototype.randomExpressionFromInts = function randomExpression(intLeft, intRight, operator)
{
    return intLeft + operator + intRight + '=';
}

ExpressionGenerator.prototype.randomOperator = function randomOperator()
{
    var opIndex = Random.integer(0, 4)(this.mt)
    return this.operators[opIndex]
}

ExpressionGenerator.prototype.randomExpression = function randomExpression()
{
    return this.randomExpressionFromInts(this.randomInteger(), this.randomInteger(), this.randomOperator())
}

module.exports = ExpressionGenerator