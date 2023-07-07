import type { RestApiResponseBodyFormat } from '../enum';

export interface ResponseBodyToTargetFormatConverterAsync<RF extends RestApiResponseBodyFormat> {
  isSupported(format: RestApiResponseBodyFormat): typeof format extends RF ? true : false;
  convert<T>(response: Response): Promise<T>;
}

export interface ResponseBodyToTargetFormatConvertersChainAsync {
  /**
   * Converts any response into the target format.
   *
   * @param {RestApiResponseBodyFormat} format - a format that the body should be converted into.
   * @param {Response} response - a response object body of which to convert.
   * @throws {Error} - if the format is not supported.
   * @returns {Promise}
   */
  convert<T>(format: RestApiResponseBodyFormat, response: Response): Promise<T>;
}
