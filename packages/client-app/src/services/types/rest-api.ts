import type { RestAPIRequestDescriptionNoPayload, RestAPIRequestDescription, RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType } from '@react-node-monorepo/infrastructure';

export interface RestAPIService {
    readonly baseUrl: URL;
    sendRequest<R extends RestAPIRequestDescription<unknown, unknown> | RestAPIRequestDescriptionNoPayload>(
        request: R
    ): Promise<RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType<R>>
    setAuthToken(value: string): void;
}
