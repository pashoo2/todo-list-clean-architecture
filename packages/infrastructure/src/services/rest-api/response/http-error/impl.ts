import { HttpError } from '../types/http-error';
import { HttpErrorAbstractImpl } from './abstract';
export class HttpErrorImpl extends HttpErrorAbstractImpl implements HttpError {
  constructor(public readonly statusCode: number, messageOrError: string | Error) {
    super(String(messageOrError));
  }
}
