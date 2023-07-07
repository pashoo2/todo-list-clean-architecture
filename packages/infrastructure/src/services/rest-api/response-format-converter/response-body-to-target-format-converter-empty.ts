import { RestApiResponseBodyFormat } from '../enum';
import { ResponseBodyToTargetFormatConverterAsync } from '../types';

export class ResponseBodyToTargetFormatConverterAsyncEmptyImpl
  implements ResponseBodyToTargetFormatConverterAsync<RestApiResponseBodyFormat.EMPTY>
{
  public isSupported(
    format: RestApiResponseBodyFormat,
  ): typeof format extends RestApiResponseBodyFormat.EMPTY ? true : false {
    const result = format === RestApiResponseBodyFormat.EMPTY;
    return result as typeof format extends RestApiResponseBodyFormat.EMPTY ? true : false;
  }
  public convert<T>(): Promise<T> {
    return Promise.resolve(void undefined) as Promise<T>;
  }
}
