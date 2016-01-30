'use strict'

var ExpressionEvaluator = function ExpressionEvaluator()
{

}

ExpressionEvaluator.prototype.answer = function answer(rawExpression)
{
    var result = '';

    if(rawExpression == null || rawExpression == undefined)
    {
        return result;
    }

    var clean = rawExpression.replace('=', '')
    result = eval(clean).toString();
    return result;
}

module.exports = ExpressionEvaluator