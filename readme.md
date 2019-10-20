# Todo App

it is an Full application for todo backend in (Nodejs , Mongodb) and frontend in (ReactJS).
this application is restricted for **TPConnects** company only.

[Demo Video](./todo-demo.mov)

## API specs

\* only by role Admin

### Users and Authentications

| #    | API           | Description   | Method | Params                   | header                           |
| ---- | ------------- | ------------- | ------ | ------------------------ | -------------------------------- |
| 1    | /api/v1/login | to Sign in    | POST   | username, password       | N/A                              |
| 2 \* | /api/v1/user  | get all users | GET    | N/A                      | authorization : Bearer < token > |
| 3 \* | /api/v1/user  | create user   | POST   | username, password, role | authorization : Bearer < token > |
| 4 \* | /api/v1/user  | delete user   | DELETE | userId                   | authorization : Bearer < token > |

### Todo operations

| #    | API                     | Description             | Method | Params   | header                           |
| ---- | ----------------------- | ----------------------- | ------ | -------- | -------------------------------- |
| 1    | /api/v1/todo            | create todo             | POST   | todo     | authorization : Bearer < token > |
| 2    | /api/v1/todo            | get all user todos      | GET    | N/A      | authorization : Bearer < token > |
| 3 \* | /api/v1/todo            | get all todos by Id     | GET    | userId   | authorization : Bearer < token > |
| 4    | /api/v1/todo/:id        | get todo by id          | GET    | id       | authorization : Bearer < token > |
| 5 \* | /api/v1/todo/:id        | delete todo by id       | DELETE | id       | authorization : Bearer < token > |
| 6    | /api/v1/todo/:id        | edit todo message by id | PATCH  | id, todo | authorization : Bearer < token > |
| 7    | /api/v1/todo/:id/status | change status by id     | PATCH  | id       | authorization : Bearer < token > |

## requirement

1. NodeJS 10+
2. MongoDB
3. NPM / Yarn

## run server

1. change directory to server
2. `npm install`
3. enter dummy data by running `npm run seed`
4. npm start

## run ReactJS

1. change directory to todo
2. `npm install`
3. run command `npm start`

## Credentials

- username : admin
- password : admin

## bugs to fix

1. No fontend Implementation for edit API
2. Routing not implemented

## whish-list

1. create Mobile App by React native
