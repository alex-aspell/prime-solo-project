CREATE TABLE users (
id serial primary key,
username varchar(80) not null UNIQUE,
password varchar(240) not null,
age int, 
gender varchar(10)
);

CREATE TABLE ratings (
id serial primary key,
rating int, 
user_id int
);