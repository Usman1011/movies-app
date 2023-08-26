MsSql Database is used for this application, after the deployment phase Db was
containerized using mssql image 
Application was also containerized and both containers were run on the same network
to enable inter-container communication to 
do crud operations from my application and database.

to run all the tests: run "npm run tests"
run "docker-compose up -d" to  create and run containers
import postman collection and postman environment to test Apis (Make Sure to select imported enviroment so that the environment variables can be read for API authorization)