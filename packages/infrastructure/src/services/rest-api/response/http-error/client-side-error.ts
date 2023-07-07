import { HttpErrorStatusCode } from '../enum';
import type { HttpError } from '../types/http-error';

export class HTTPErrorClientSideImpl extends Error implements HttpError {
  public get statusCode(): number {
    return HttpErrorStatusCode.Client;
  }
}
