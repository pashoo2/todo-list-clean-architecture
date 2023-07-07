import type { DTOCustomerEntity } from '@react-node-monorepo/application';

import type { PayloadDataSerializable } from '../../../../types';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export interface CustomerRestAPIRequestReadByIdPayload extends PayloadDataSerializable {
  id: string;
}

export interface CustomerRestAPIResponseReadByIdPayload extends PayloadDataSerializable {
  customer: DTOCustomerEntity | undefined;
}
