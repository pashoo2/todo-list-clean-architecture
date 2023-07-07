import { RestApiResponseBodyFormat } from '../enum';
import { ResponseBodyToTargetFormatConverterAsync } from '../types';

export class ResponseBodyToTargetFormatConverterAsyncJSONImpl
  implements ResponseBodyToTargetFormatConverterAsync<RestApiResponseBodyFormat.JSON>
{
  public isSupported(
    format: RestApiResponseBodyFormat,
  ): typeof format extends RestApiResponseBodyFormat.JSON ? true : false {
    const result = format === RestApiResponseBodyFormat.JSON;
    return result as typeof format extends RestApiResponseBodyFormat.JSON ? true : false;
  }
  public convert<T>(response: Response): Promise<T> {
    return response.json();
  }
}
