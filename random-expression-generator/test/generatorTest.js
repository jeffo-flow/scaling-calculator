var ExpressionGenerator = require('../generator.js')
var assert = require('assert')

suite('generator', function() {

    function isInteger(x) {
        return x % 1 === 0;
    }

    test('generates a random integer', function() {
        var gen = new ExpressionGenerator()
        assert.equal(isInteger(gen.randomInteger()), true)

        var first = gen.randomInteger()
        var second = gen.randomInteger()
        var third = gen.randomInteger()

        assert.notEqual(first,second)
        assert.notEqual(second, third)

        assert.equal(true, first > 0)
        assert.equal(true, first <= Number.MAX_SAFE_INTEGER)
    })

    test('generates a random expression', function(){
        var gen = new ExpressionGenerator()
        assert.equal('42+55=', gen.randomExpressionFromInts(42,55,'+'))
        assert.equal(true, gen.randomExpression().indexOf('=') > 0 );
        assert.equal(true, gen.randomExpression() !== gen.randomExpression() !== gen.randomExpression())
    })

})