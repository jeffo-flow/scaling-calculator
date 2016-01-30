#!bin/bash
cd ./answerDispatcher
pwd
npm test

cd ../
cd ./random-expression-generator
pwd
npm test

cd ../
cd ./simple-expression-evaluator
pwd
npm test

cd ../
cd ./integration
pwd
mocha -u tdd

cd ../