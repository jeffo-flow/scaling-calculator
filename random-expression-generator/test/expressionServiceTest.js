var ExpressionService = require('../expressionService.js')
var assert = require('assert')
var http = require('http')

suite('expressionService', function() {

    var logResult = function(expression){console.log('expression received: '+expression)}

    function getExpressionFromServer(done, onData){
        http.get('http://localhost:4242/', function (res) {
            var result = ''

            res.on("data", function(chunk) {
                result += chunk
                onData(result);
            });

            assert.equal(200, res.statusCode);
            res.resume()

            if(done != null)
            {
                done()
            }
        });
    }


    test('serves up expressions', function(done) {
        var service = new ExpressionService()
        service.start(4242);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(null, logResult);
        getExpressionFromServer(done, logResult);
    })


})