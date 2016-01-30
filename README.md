# Scaling Calculator

The scaling calculator consists of three main components ExpressionService, AnswerService, and the AnswerDispatcher.
ExpressionService generates random simple math integer based equations such as 123+10= and 45*67=.  AnswerService evaluates simple math expressions and calculates the correct answer.  AnswerDispatcher builds clusters of AnswerService and ExpressionService workers to produce the massive scaling calculator.

## ExpressionService
The expression service handles a http get request and responds with a random integer expression of the form (left-int)(operator)(right-int)=
There operators are randomly selected from ['+','-','%','*','/']

Examples:
123+23423=
8%21=
788/12312=


## AnswerService
The answer service handles a get http request with query params representing a (url encoded) math expression

Examples:
question = 123+42=
request = http://localhost/calc?q=123%2B42%3D
response = 165

## AnswerDispatcher
The answer dispatcher builds AnswerService clusters.  Each AnswerService asynchronously consumes the output of many ExpressionServices
It's easy to add more clusters through the addCluster command

Example:
```
var answerServiceConf0 = {id:1, endPoint: 'http://localhost:2020/'}
var evalServiceConf0 = {id:1, endPoint: 'http://localhost:4040/'}
var evalServiceConf1 = {id:2, endPoint: 'http://localhost:4141/'}
var evalServiceConf2 = {id:3, endPoint: 'http://localhost:4242/'}

var d = new AnswerDispatcher()
d.addCluster(answerServiceConf0, [evalServiceConf0, evalServiceConf1, evalServiceConf2])
d.start()
```

#Developer setup
$ sh dev-install.sh

#Run All Tests
$ sh test-all.sh

#Clean up node modules
$ sh clean-all.sh

#Performance
The initial performance easily runs at 200 Requests per second with a single cluster consisting of one evaluator with 3 expression generators.
To 'go faster' it's very simple, either expand the cluster with more expression generators, or add more clusters.
