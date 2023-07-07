import {
  RestAPIRequestMethod,
  CustomerRestAPIResponseReadByIdPayload,
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID,
  REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD,
  CustomerRestAPIRequestReadByIdPayload,
} from '@react-node-monorepo/infrastructure';
import {
  DTOCustomerEntityToEntityImpl,
  DTOCustomerEntityFromEntityImpl,
  type DTOCustomerEntity,
  type CustomerEntityRepositoryCRUD,
} from '@react-node-monorepo/application';
import { type Request } from 'express';
import { EntityType, type CustomerEntity } from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import { type EndpointPrivate } from '../../../types';
import { EndpointPrivateAbstractImpl } from '../../../private-abstract';
import type { UserRole } from '../../../../types';

export class EndpointCustomerEntityReadById
  extends EndpointPrivateAbstractImpl<CustomerRestAPIResponseReadByIdPayload>
  implements EndpointPrivate<CustomerRestAPIResponseReadByIdPayload>
{
  public get isPublic(): false {
    return false;
  }
  public get path(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD;
  }
  public get roles(): Readonly<UserRole[]> {
    return Object.freeze([EntityType.Admin, EntityType.Customer]);
  }

  protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
  protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();

  constructor(protected _customerEntityRepositoryCRUDImpl: CustomerEntityRepositoryCRUD) {
    super();
  }

  protected async _handle(request: Request): Promise<CustomerRestAPIResponseReadByIdPayload> {
    const { id } = request.body as CustomerRestAPIRequestReadByIdPayload;

    assert(typeof id === 'string', 'Id should be a string');

    const customerReadResult = await this._customerEntityRepositoryCRUDImpl.read(id);

    if (!customerReadResult.isSuccess) {
      throw customerReadResult.result;
    }

    const customerEntityOrUndefined: CustomerEntity | undefined = customerReadResult.result;

    if (!customerEntityOrUndefined) {
      return {
        customer: undefined,
      };
    }

    const customerEntityDTO: DTOCustomerEntity =
      this._dtoCustomerEntityFromEntityImpl.derive(customerEntityOrUndefined);
    return {
      customer: customerEntityDTO,
    };
  }
}
