import { Application } from 'express';
export type ApplicationRestApiRequestHandlerMethod =
  | Application['get']
  | Application['post']
  | Application['patch']
  | Application['delete']
  | Application['put'];
