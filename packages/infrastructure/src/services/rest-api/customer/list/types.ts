import type {
  CustomerEntityRepositoryListFilterParameters,
  DTOCustomerEntity,
  ListFromStorage,
} from '@react-node-monorepo/application';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export type CustomerEntityRestAPIRequestListPayload = CustomerEntityRepositoryListFilterParameters;

export type CustomerEntityRestAPIResponseListPayload = ListFromStorage<DTOCustomerEntity>;
