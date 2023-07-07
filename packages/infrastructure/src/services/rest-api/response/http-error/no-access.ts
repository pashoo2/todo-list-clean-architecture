import { HttpErrorStatusCode } from '../enum';
import type { HttpError } from '../types';
import { HttpErrorAbstractImpl } from './abstract';

export class HttpErrorNoAccessImpl extends HttpErrorAbstractImpl implements HttpError {
  public get statusCode(): number {
    return HttpErrorStatusCode.NoAccess;
  }
}
