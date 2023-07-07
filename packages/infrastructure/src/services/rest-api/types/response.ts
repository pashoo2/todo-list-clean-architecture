import type { RestAPIRequestDescriptionNoPayload } from './request';

export type RestAPIResponsePayloadPayloadTypeByRequestDescriptionTypeDescriptionType<
  REQ extends RestAPIRequestDescriptionNoPayload<unknown>,
> = REQ extends RestAPIRequestDescriptionNoPayload<infer RES> ? RES : never;
