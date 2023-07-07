import { applicationConfiguration, createResponseBodyToTargetFormatConvertersChainAsyncImplDefault } from '@react-node-monorepo/infrastructure'

import { RestAPIServiceImpl, type RestAPIService } from "../../../services";

export function createRestAPIService(): RestAPIService {
    return new RestAPIServiceImpl({
        baseUrl: applicationConfiguration.resetApi.serverUrl,
        responseBodyToTargetFormatConvertersChainAsync: createResponseBodyToTargetFormatConvertersChainAsyncImplDefault(),
    }) as RestAPIService
}
