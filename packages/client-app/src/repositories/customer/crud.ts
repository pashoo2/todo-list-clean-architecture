import {
  CustomerEntityRepositoryCRUDMethodLogInParameters,
  type CustomerEntityRepositoryCRUD,
  CustomerEntityRepositoryCRUDMethodSignUpParameters,
  DTOCustomerEntityToEntityImpl,
  DTOCustomerEntityFromEntityImpl,
  OperationResult,
  DTOCustomerEntity,
} from '@react-node-monorepo/application';
import { CustomerEntity, CustomerEntityImpl, EntityType } from '@react-node-monorepo/domain';
import {
  CustomerEntityRestAPIRequestSignUpPayload,
  CustomerEntityRestAPIResponseSignUpPayload,
  HttpError,
  OperationResultByHttpError,
  RestAPIRequestDescriptionCustomerSignUp,
  RestAPIRequestDescriptionUserLogIn,
  UserRestAPIRequestLogInPayload,
  UserRestAPIResponseLogInPayload,
  RestAPIRequestDescriptionCustomerReadById,
  CustomerRestAPIResponseReadByIdPayload,
} from "@react-node-monorepo/infrastructure";
import { type RestAPIService } from "../../services";

export class CustomerEntityRepositoryCRUDImpl implements CustomerEntityRepositoryCRUD {
  // TODO: use Dependency Injection
  protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
  protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();
  protected _cache: Record<CustomerEntity['id'], CustomerEntity> = {}

  constructor(
    protected _restAPIService: RestAPIService,
  ) {}

  public async logIn(
    parameters: CustomerEntityRepositoryCRUDMethodLogInParameters,
  ) {
    const { email, password } = parameters;
    const payload: UserRestAPIRequestLogInPayload = {
      email: email.email,
      password: password.password,
    }
    const request = new RestAPIRequestDescriptionUserLogIn(payload)
    try {
      const responseSignUpPayload = await this._restAPIService.sendRequest(request) as UserRestAPIResponseLogInPayload // TODO: resolve type cast
      if (responseSignUpPayload.user.type === EntityType.Customer) {
        const customerEntity = this._dtoCustomerEntityToEntityImpl.derive(responseSignUpPayload.user);
        
        this._writeToCache(customerEntity);
        return {
          isSuccess: true,
          result: customerEntity,
        };
      } else {
        throw new Error('The user is not a customer')
      }
    } catch(err) {
      return this._getOperationResult(err);
    }
  }

  public async signUp(
    parameters: CustomerEntityRepositoryCRUDMethodSignUpParameters,
  ) {
    const { customer, password } = parameters;

    const payload: CustomerEntityRestAPIRequestSignUpPayload = {
      customer: this._dtoCustomerEntityFromEntityImpl.derive(customer),
      password: password.password,
    }
    const request = new RestAPIRequestDescriptionCustomerSignUp(payload)

    try {
      const responseSignUpPayload = await this._restAPIService.sendRequest(request) as CustomerEntityRestAPIResponseSignUpPayload // TODO: resolve type cast
      const customerEntity = this._dtoCustomerEntityToEntityImpl.derive(responseSignUpPayload.customer);
    
      this._writeToCache(customerEntity);
      return {
        isSuccess: true,
        result: customerEntity,
      };
    } catch(err) {
      return this._getOperationResult(err);
    }
  }

  public async read(id: string): Promise<OperationResult<CustomerEntity | undefined>> {
    const customerEntityOrUndefined: CustomerEntity | undefined = this._readFromCache(id);

    if (customerEntityOrUndefined) {
      return {
        isSuccess: true,
        result: customerEntityOrUndefined,
      };
    }

    const request = new RestAPIRequestDescriptionCustomerReadById({
      id
    });
    
    const response = await this._restAPIService.sendRequest(request) as CustomerRestAPIResponseReadByIdPayload;
    const customerDTOOrUndefined: DTOCustomerEntity | undefined = response.customer
    
    if (!customerDTOOrUndefined) {
      return {
        isSuccess: true,
        result: undefined,
      }
    }

    const customerEntity: CustomerEntity = this._dtoCustomerEntityToEntityImpl.derive(customerDTOOrUndefined)

    this._writeToCache(customerEntity);
    return {
      isSuccess: true,
      result: customerEntity,
    };
  }

  public async update(_entity: CustomerEntityImpl): Promise<any> {
    throw new Error('Not supported')
  }

  public async delete(_id: string): Promise<any> {
    throw new Error('Not supported')
  }

  protected _getOperationResult(err): OperationResult<typeof err> {
    return new OperationResultByHttpError(err as Error | HttpError);
  }

  protected _writeToCache(customer: CustomerEntity): void {
    this._cache[customer.id] = customer
  }

  protected _readFromCache(id: string): CustomerEntity | undefined {
    return this._cache[id];
  }

  protected _deleteFromCache(id: string): void {
    delete this._cache[id];
  }
}
  