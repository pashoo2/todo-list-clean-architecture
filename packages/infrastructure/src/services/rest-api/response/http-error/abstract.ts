import type { HttpError } from '../types/http-error';

export abstract class HttpErrorAbstractImpl extends Error implements HttpError {
  abstract readonly statusCode: number;
}
