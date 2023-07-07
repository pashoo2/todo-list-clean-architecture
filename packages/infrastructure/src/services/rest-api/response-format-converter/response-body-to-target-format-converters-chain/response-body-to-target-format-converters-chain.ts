import { RestApiResponseBodyFormat } from '../../enum';
import {
  ResponseBodyToTargetFormatConverterAsync,
  ResponseBodyToTargetFormatConvertersChainAsync,
} from '../../types';

/**
 * A "Chain of responsibility" pattern implementation that accepts all converters and
 * applies the one that supports the target format.
 *
 * @date 6/29/2023 - 7:12:45 PM
 *
 * @export
 * @class ResponseBodyToTargetFormatConvertersChainImpl
 * @typedef {ResponseBodyToTargetFormatConvertersChainAsyncImpl}
 * @implements {ResponseBodyToTargetFormatConvertersChainAsync}
 */
export class ResponseBodyToTargetFormatConvertersChainAsyncImpl
  implements ResponseBodyToTargetFormatConvertersChainAsync
{
  protected get _convertersAmount(): number {
    return this._converters.length;
  }
  constructor(
    protected readonly _converters: Array<
      ResponseBodyToTargetFormatConverterAsync<RestApiResponseBodyFormat>
    >,
  ) {}
  public async convert<T>(format: RestApiResponseBodyFormat, response: Response): Promise<T> {
    let converter;
    for (let converterIdx = 0; converterIdx < this._convertersAmount; converterIdx += 1) {
      converter = this._converters[converterIdx];
      if (converter.isSupported(format)) {
        return converter.convert(response);
      }
    }
    throw new Error(`The format "${format}" is not supported`);
  }
}
