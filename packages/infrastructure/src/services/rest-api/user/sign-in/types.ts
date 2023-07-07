import type { DTOCustomerEntity, DTOAdminEntity } from '@react-node-monorepo/application';

import type { PayloadDataSerializable } from '../../../../types';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export interface UserRestAPIRequestLogInPayload extends PayloadDataSerializable {
  email: string;
  password: string;
}

export interface UserRestAPIResponseLogInPayload extends PayloadDataSerializable {
  user: DTOCustomerEntity | DTOAdminEntity;
}
