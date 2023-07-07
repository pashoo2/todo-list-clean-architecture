import {
  RestAPIRequestMethod,
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_LIST,
  REST_API_ENDPOINT_CUSTOMER_LIST_METHOD,
  CustomerEntityRestAPIResponseListPayload,
  HTTPErrorClientSideImpl,
  CustomerEntityRestAPIRequestListPayload,
} from '@react-node-monorepo/infrastructure';
import {
  type CustomerEntityRepositoryListFilter,
  DTOCustomerEntityFromEntityImpl,
  AdminEntityUseCaseReadCustomerListImpl,
} from '@react-node-monorepo/application';
import { CustomerEntity, EntityType } from '@react-node-monorepo/domain';

import { type Request } from 'express';
import { EndpointPrivateAbstractImpl } from '../private-abstract';
import { CustomerEntityRepositoryListImpl } from '../../repository';
import type { EndpointPrivate } from '../types';
import type { UserRole } from '../../types';
import { CustomerEntityRepositoryListFilterImpl } from '../../repository/customer/list/filter';

export class EndpointPrivateCustomerList
  extends EndpointPrivateAbstractImpl<CustomerEntityRestAPIResponseListPayload>
  implements EndpointPrivate<CustomerEntityRestAPIResponseListPayload>
{
  public get isPublic(): false {
    return false;
  }
  public get path(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_LIST;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_LIST_METHOD;
  }

  public readonly roles: Readonly<UserRole[]> = [EntityType.Admin];

  // TODO: inject via DI
  protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();
  protected _customerEntityRepositoryListFilter: CustomerEntityRepositoryListFilter;

  constructor(protected _customerEntityRepositoryListImpl: CustomerEntityRepositoryListImpl) {
    super();
    this._customerEntityRepositoryListFilter = new CustomerEntityRepositoryListFilterImpl();
  }

  protected async _handle(request: Request): Promise<CustomerEntityRestAPIResponseListPayload> {
    const parameters = request.query as unknown as CustomerEntityRestAPIRequestListPayload;
    const useCase = new AdminEntityUseCaseReadCustomerListImpl(
      this._customerEntityRepositoryListImpl,
      this._customerEntityRepositoryListFilter,
    );
    const result = await useCase.run(parameters);

    if (result instanceof Error) {
      throw new HTTPErrorClientSideImpl(String(result));
    }
    return {
      ...result,
      values: result.values.map(this.$convertEntityToDTO),
    };
  }

  private $convertEntityToDTO = (entity: CustomerEntity) =>
    this._dtoCustomerEntityFromEntityImpl.derive(entity);
}
