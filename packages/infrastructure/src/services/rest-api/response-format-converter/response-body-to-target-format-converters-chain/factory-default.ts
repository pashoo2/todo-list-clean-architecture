import { ResponseBodyToTargetFormatConverterAsyncEmptyImpl } from '../response-body-to-target-format-converter-empty';
import { ResponseBodyToTargetFormatConverterAsyncJSONImpl } from '../response-body-to-target-format-converter-json';
import { ResponseBodyToTargetFormatConvertersChainAsyncImpl } from './response-body-to-target-format-converters-chain';

export function createResponseBodyToTargetFormatConvertersChainAsyncImplDefault(): ResponseBodyToTargetFormatConvertersChainAsyncImpl {
  const responseBodyToTargetFormatConverterAsyncJSONImpl =
    new ResponseBodyToTargetFormatConverterAsyncJSONImpl();
  const responseBodyToTargetFormatConverterAsyncEmptyImpl =
    new ResponseBodyToTargetFormatConverterAsyncEmptyImpl();

  return new ResponseBodyToTargetFormatConvertersChainAsyncImpl([
    responseBodyToTargetFormatConverterAsyncJSONImpl,
    responseBodyToTargetFormatConverterAsyncEmptyImpl,
  ] as unknown as ConstructorParameters<
    typeof ResponseBodyToTargetFormatConvertersChainAsyncImpl
  >[0]); // TODO: resolve type cast
}
