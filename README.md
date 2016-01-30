# scaling-calculator

The scaling calculator consists of three main components, a random math expression generating service, an expression
 evaluator service, and an answer dispatcher.  The answer dispatcher requests random math questions from the expression service and
 then evaluates the answer using the evaluator service.

  The answer dispatcher builds clusters of single evaluators, where each evaluator may many expression generators.  The answer dispatcher
   uses a simple dispatch loop that once per interval (currently 10ms) has each evaluator send concurrent requests to the each of it's random expression
  generators.  The result is a scalable question and answer system.


#Developer setup
> sh dev-install.sh

#Run All Tests
> sh test-all.sh

#Clean up node modules
> sh clean-all.sh

#Performance
The initial performance easily runs at 200 Requests per second with a single cluster consisting of one evaluator with 3 expression generators.
To 'go faster' it's very simple, either expand the cluster with more expression generators, or add more clusters.
