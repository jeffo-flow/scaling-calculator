var ExpressionEvaluator = require('../evaluator.js')
var assert = require('assert')


suite('expression evaluator', function() {

    test('addition', function() {
        var e = new ExpressionEvaluator()
        assert.equal(e.answer('1+20='),21)
    })

    test('subtraction', function() {
        var e = new ExpressionEvaluator()
        assert.equal(e.answer('1-20='),-19)
    })

    test('multiplication', function() {
        var e = new ExpressionEvaluator()
        assert.equal(e.answer('8*20='),160)
    })

    test('division', function() {
        var e = new ExpressionEvaluator()
        assert.equal(e.answer('42/42='),1)
    })

    test('ok to not have an =', function() {
        var e = new ExpressionEvaluator()
        assert.equal(e.answer('3+2'),5)
    })

    test('could not evaluate', function() {
        var e = new ExpressionEvaluator()
        try {
            e.answer('a+b')
            assert.fail('should have thrown an exception')
        }
        catch(e)
        {
            assert.equal(e.message, 'a is not defined')
        }
    })
})