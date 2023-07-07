import type { DTOCustomerEntity } from '@react-node-monorepo/application';

import type { PayloadDataSerializable } from '../../../../types';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export interface CustomerEntityRestAPIRequestSignUpPayload extends PayloadDataSerializable {
  customer: DTOCustomerEntity;
  password: string;
}

export interface CustomerEntityRestAPIResponseSignUpPayload extends PayloadDataSerializable {
  customer: DTOCustomerEntity;
}
