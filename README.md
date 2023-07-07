### APPLICATION
Server and Client monorepo leveraging Clean Architecture pattern with shared business and application logic.

Client is based on React framework and Create React App ejected.
Server - Express.js.

## RUN
To run the project use: `yarn start`.

## Issues
To run a build of each package individually in the "watch" mode:
`cd packages/(package directory) && yarn start`

To debug server:
`cd packages/server-app && yarn build -- --watch` and in VSCode IDE `"Run" -> "Start Debugging".`
