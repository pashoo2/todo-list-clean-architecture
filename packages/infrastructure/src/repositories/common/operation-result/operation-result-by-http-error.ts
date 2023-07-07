import { type OperationResult } from '@react-node-monorepo/application';
import { type HttpError } from '../../../services';

export class OperationResultByHttpError implements OperationResult<HttpError | Error> {
  get isSuccess(): false {
    return false;
  }
  constructor(public readonly result: Error | HttpError) {}
}
