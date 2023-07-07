import {
  HTTPErrorClientSideImpl,
  CustomerEntityRestAPIRequestSignUpPayload,
  CustomerEntityRestAPIResponseSignUpPayload,
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_SIGN_UP,
  RestAPIRequestMethod,
  REST_API_ENDPOINT_CUSTOMER_SIGN_UP_METHOD,
} from '@react-node-monorepo/infrastructure';
import {
  DTOCustomerEntityToEntityImpl,
  DTOCustomerEntityFromEntityImpl,
  DTOCustomerEntity,
  CustomerEntityUseCaseSignUpImpl,
} from '@react-node-monorepo/application';
import { type Request } from 'express';
import { type CustomerEntity } from '@react-node-monorepo/domain';

import { type EndpointPublic } from '../../../types';
import { type CustomerEntityRepositoryCRUDImpl } from '../../../../repository';

export class EndpointPublicCustomerEntitySignUp
  implements EndpointPublic<CustomerEntityRestAPIResponseSignUpPayload>
{
  public get isPublic(): true {
    return true;
  }
  public get path(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_SIGN_UP;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_SIGN_UP_METHOD;
  }

  protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
  protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();

  constructor(protected _customerEntityRepositoryCRUDImpl: CustomerEntityRepositoryCRUDImpl) {}

  public async handle(request: Request): Promise<CustomerEntityRestAPIResponseSignUpPayload> {
    const { customer, password } = request.body as CustomerEntityRestAPIRequestSignUpPayload;

    const useCase = new CustomerEntityUseCaseSignUpImpl(this._customerEntityRepositoryCRUDImpl);
    const customerEntityImplOrError: CustomerEntity | Error = await useCase.run({
      customer: this._dtoCustomerEntityToEntityImpl.derive(customer),
      password,
    });

    if (customerEntityImplOrError instanceof Error) {
      throw new HTTPErrorClientSideImpl(String(customerEntityImplOrError));
    }

    const customerRegisteredDTO: DTOCustomerEntity =
      this._dtoCustomerEntityFromEntityImpl.derive(customerEntityImplOrError);
    return {
      customer: customerRegisteredDTO,
    };
  }
}
