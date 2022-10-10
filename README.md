# Northcoders House of Games API

## Hello and welcome to my BACKEND project

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.


## How to setup this project to work on your own

Clone this repository and run the command, npm install to install the dependancies needed.
### 
```
npm install
```
## After that you need to reate Enviroment Variables

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.