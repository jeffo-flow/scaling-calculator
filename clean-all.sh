#!bin/bash
echo 'cleaning node modules'

cd ./answerDispatcher
pwd
rm -rf ./node_modules

cd ../
cd ./random-expression-generator
pwd
rm -rf ./node_modules

cd ../
cd ./simple-expression-evaluator
pwd
rm -rf ./node_modules

cd ../