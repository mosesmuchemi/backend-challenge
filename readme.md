running the application:

1. npm install
2. npm run server

database credetials on line 11

working end points:
POST/personnel/create 
-sample json data {
"personnel_oname": "Moses",
"personnel_fname": "Migwi",
"personnel_phone": "0722730064",
"personnel_password": "123456"
}

POST/personnel/login
-sample json data
{
"personnel_phone": "0722730064",
"personnel_password": "123456"
}


GET/tasks -returns all tasks in database
GET/personnel -returns all personnel in database
