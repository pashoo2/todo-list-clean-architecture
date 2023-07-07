import { 
    RecordSimpleStringifiableFlatString,
    RecordStringifiableJSONString,
    RestAPIRequestDescription,
    RestAPIRequestDescriptionNoPayload,
    RestAPIRequestMethod,
    RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType,
    RestApiResponseBodyFormat,
    SimpleStringifiable,
    HttpErrorImpl
} from '@react-node-monorepo/infrastructure';
import type  {RestAPIService } from "../types";
import { JSONSerializerImpl, QueryStringSerializerImpl, ResponseBodyToTargetFormatConvertersChainAsync } from "@react-node-monorepo/infrastructure";
import { Filter } from '../../../../application/src/repository/type';
import { appState } from "../../application";

export interface RestAPIServiceImplConstructorParameters {
    baseUrl: URL;
    responseBodyToTargetFormatConvertersChainAsync: ResponseBodyToTargetFormatConvertersChainAsync;
    authToken?: string;
}

export class RestAPIServiceImpl implements RestAPIService {
    public get baseUrl(): URL {
        return this._baseUrl;
    }

    protected _commonHeaders: Record<string, string> = {}

    protected _jsonSerializer = new JSONSerializerImpl()
    
    protected _queryStringSerializer = new QueryStringSerializerImpl()
    protected _baseUrl: URL;
    protected _responseBodyToTargetFormatConvertersChainAsync: ResponseBodyToTargetFormatConvertersChainAsync

    constructor(parameters: RestAPIServiceImplConstructorParameters) {
        const { baseUrl, authToken, responseBodyToTargetFormatConvertersChainAsync } = parameters
        
        // TODO: check all parameters are valid
        this._baseUrl = baseUrl;
        this._responseBodyToTargetFormatConvertersChainAsync = responseBodyToTargetFormatConvertersChainAsync;

        this._setAuthorizationHeader(authToken);
    }

    public async sendRequest<REQ extends RestAPIRequestDescription<unknown> | RestAPIRequestDescriptionNoPayload>(
        requestDescription: REQ
    ): Promise<RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType<typeof requestDescription>> {
        const requestUrl: URL = this._getRequestURLByRequestDescription(requestDescription)
        const requestParameters: RequestInit = this._getRequestParametersByRequestDescription(requestDescription)
        const headers: HeadersInit = this._getHeadersByRequestDescription(requestDescription)
        const finalRequestParameters: RequestInit = {
            ...requestParameters,
            headers: {
                ...requestParameters.headers,
                ...headers,
            }
        }
        const response: Response = await fetch(requestUrl, finalRequestParameters);
        await this._checkIfFailureResponse(response);
        // TODO: resolve type case
        return await this._convertResponseToTargetFormat(requestDescription, response) as any as Promise<RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType<typeof requestDescription>>;
    }

    public setAuthToken(authToken: string): void {
        this._setAuthorizationHeader(authToken);
    }

    protected async _convertResponseToTargetFormat(
        requestDescription: RestAPIRequestDescriptionNoPayload,
        response: Response
    ): Promise<RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType<typeof requestDescription>> {
        return await this._responseBodyToTargetFormatConvertersChainAsync.convert(requestDescription.responseFormat, response);
    }

    protected _getRequestParametersByRequestDescription(
        requestDescription: RestAPIRequestDescription<unknown> | RestAPIRequestDescriptionNoPayload
    ): RequestInit {
        const { method } = requestDescription;
        const requestParameters: RequestInit = {
            headers: this._commonHeaders,
            method: method.toLowerCase(),
        }
        const payloadOrUndefined = (requestDescription as RestAPIRequestDescription<unknown>).payload;
        if (method !== RestAPIRequestMethod.GET && payloadOrUndefined) {
            requestParameters.body = this._jsonSerializer.toString(payloadOrUndefined as RecordStringifiableJSONString | SimpleStringifiable);
        }
        return requestParameters
    }

    protected _getHeadersByRequestDescription(
        requestDescription: RestAPIRequestDescription<unknown> | RestAPIRequestDescriptionNoPayload
    ): HeadersInit {
        const { method, responseFormat } = requestDescription
        const payloadOrUndefined = (requestDescription as RestAPIRequestDescription<unknown>).payload;
        let headers: HeadersInit = {}
        if (method !== RestAPIRequestMethod.GET && payloadOrUndefined) {
            headers = {
                ...headers,
                'Content-Type': 'application/json'
            }}
        if ((responseFormat as RestApiResponseBodyFormat) === RestApiResponseBodyFormat.JSON) {
            headers = {
                ...headers,
                'Accept': 'application/json',
            }
        }
        return headers
    }

    protected _getRequestURLByRequestDescription(
        requestDescription: RestAPIRequestDescription<unknown> | RestAPIRequestDescriptionNoPayload
    ): URL {
        const {
            endpointPath,
            method
        } = requestDescription
        let requestUrl: URL = new URL(endpointPath, this._baseUrl);
        const payloadOrUndefined = (requestDescription as RestAPIRequestDescription<unknown>).payload
        
        if (payloadOrUndefined && method === RestAPIRequestMethod.GET) {
            // TODO: refine the codebase
            if ((payloadOrUndefined as Filter<unknown>).toQuery) {
                requestUrl.search = (payloadOrUndefined as Filter<unknown>).toQuery(); 
            } else {
                requestUrl.search = this._queryStringSerializer.toString(payloadOrUndefined as RecordSimpleStringifiableFlatString | SimpleStringifiable)   
            }
        }
        return requestUrl
    }

    protected _setAuthorizationHeader(bearerAuthToken?: string): void {
        if (!bearerAuthToken) {
            return;
        }

        this._commonHeaders['Authorization'] = 'Bearer ' + bearerAuthToken;
    }

    protected async _checkIfFailureResponse(
        response: Response
    ): Promise<void> {
        if (response.ok && response.status < 300 && response.status > 199) {
            return; 
        }

        // TODO: add listener "unauthorized" and handle 403
        if (response.status === 403) {
            appState.user.unsetCurrentUser();
        }

        let errorMessage: string = `Failure. Response url ${response.url}. Status code ${response.status}. Status: ${response.statusText}`;
        try {
            // TODO: it maybe empty or json
            errorMessage += await response.text()
        } finally {
            throw new HttpErrorImpl(response.status, errorMessage)
        }
    }
} 