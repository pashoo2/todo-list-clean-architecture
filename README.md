
## APPLICATION
Server and Client monorepo leveraging Clean Architecture pattern with shared business and application logic.

Client is based on React framework and Create React App "ejected".
Server - Express.js.

Client package directory `<root>/packages/client-app`.

Server package directory `<root>/packages/server-app`.

Database - plain `.json` file `<root>/packages/server-app/db/data.json`.

Session storage - `<root>/packages/server-app/db/sessions/*.json`.

###  PREPARATION
Run `yarn install` in the root directory.
Required NodeJS, NPM and Yarn versions are specified in the root `package.json`.

###  LAUNCH
To run the project use: `yarn start` command in the root directory.
The client app uses static server running on `localhost:3000`.
The server is available on `localhost:5000`.

##  FEATURES
###  USERS
There are two types of users - "Admin" and "User".

You can sign up as a new "User" or use an existing one:
- email "name1@mail.com";
- password: "12345".

The admin user's credentials:
- email "admin@mail.com";
- password: "12345".
You can modify file `/packages/server-app/db/data.json` the key `/users` .

###  Admin
Can view a list of all users.
###  User
Can work with TODO list of themselve and other users.
Any TODO is available to all the registered users.

### DEBUG
To run a build of each package individually in the "watch" mode:
`cd packages/(package directory) && yarn start`

To debug server:
`cd packages/server-app && yarn build -- --watch` and in VSCode IDE `"Run" -> "Start Debugging".`

###  KNOWN ISSUES
1.	`TODO` - many places with known issues marked with this keyword.
2.	No tests.
3.	Only few JSDoc comments.
4.	There is no Docker image.
5.	User session doesn't work on the server side properly - each connection opens a new session.
6.  Haven't tested thoroughly due to being very limited in time.
