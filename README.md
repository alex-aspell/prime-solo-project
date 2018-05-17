# Rate-iology

Rate-iology is a full-stack web application that allows users to rate movies on a scale of 0 - 100. They can see aggregate data of other user ratings, demographic information, and movies they have rated previously.

## Built With

AngularJS
NodeJS
ExpressJS
SQL
The Movie Database
Bootstrap
Sweet Alerts
Passport

## Getting Started



### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

npm install
Start postreSQL database
Copy, paste, and execute the SQL text from database.sql
npm start
localhost:5000

Steps to get the development environment running.

```sql
CREATE TABLE users (
"id" serial primary key,
"username" varchar(80) not null UNIQUE,
"password" varchar(240) not null,
"age" int, 
"gender" varchar(10)
);

CREATE TABLE ratings (
"id" serial primary key,
"rating" int, 
"user_id" int
);
```

## Author

Alex Aspell
