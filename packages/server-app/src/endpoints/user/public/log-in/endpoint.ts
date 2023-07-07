import {
  HTTPErrorClientSideImpl,
  UserRestAPIRequestLogInPayload,
  UserRestAPIResponseLogInPayload as UserEntityRestAPIResponseSignInPayload,
  REST_API_ENDPOINT_USER_ROOT_PATH_V1_SIGN_IN,
  RestAPIRequestMethod,
  REST_API_ENDPOINT_USER_SIGN_IN_METHOD,
} from '@react-node-monorepo/infrastructure';
import {
  DTOCustomerEntityToEntityImpl,
  DTOCustomerEntityFromEntityImpl,
  DTOCustomerEntity,
  CustomerEntityUseCaseLogInImpl,
  AdminEntityRepositoryCRUD,
  CustomerEntityRepositoryCRUD,
  DTOAdminEntity,
  DTOAdminEntityToEntityImpl,
  DTOAdminEntityFromEntityImpl,
  AdminEntityUseCaseLogInImpl,
} from '@react-node-monorepo/application';
import { type Request } from 'express';
import { CustomerEntityImpl, AdminEntity, CustomerEntity } from '@react-node-monorepo/domain';

import { type EndpointPublic } from '../../../types';
import { type UserSession } from '../../../../services';
import { EndpointAbstractImpl } from '../../../abstract';

export class EndpointPublicUserEntitySignIn
  extends EndpointAbstractImpl<UserEntityRestAPIResponseSignInPayload>
  implements EndpointPublic<UserEntityRestAPIResponseSignInPayload>
{
  public get isPublic(): true {
    return true;
  }
  public get path(): string {
    return REST_API_ENDPOINT_USER_ROOT_PATH_V1_SIGN_IN;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_USER_SIGN_IN_METHOD;
  }

  protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
  protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();
  protected _dtoAdminEntityToEntityImpl = new DTOAdminEntityToEntityImpl();
  protected _dtoAdminEntityFromEntityImpl = new DTOAdminEntityFromEntityImpl();

  constructor(
    protected _customerEntityRepositoryCRUDImpl: CustomerEntityRepositoryCRUD,
    protected _adminEntityRepositoryCRUDImpl: AdminEntityRepositoryCRUD,
  ) {
    super();
  }

  protected async _handle(request: Request): Promise<UserEntityRestAPIResponseSignInPayload> {
    const sessionOrUndefined: UserSession | undefined = this.userSession;

    if (!sessionOrUndefined) {
      throw new Error('A session must have been started');
    }

    let userDTOOrUndefined: DTOCustomerEntity | DTOAdminEntity | undefined;
    let errorOrUndefined: Error | undefined;

    try {
      userDTOOrUndefined = await this._handleCustomerLogIn(sessionOrUndefined, request);
    } catch (err) {
      errorOrUndefined = err as Error;
    }

    try {
      userDTOOrUndefined = await this._handleAdminLogIn(sessionOrUndefined, request);
    } catch (err) {
      errorOrUndefined = err as Error;
    }

    if (!userDTOOrUndefined) {
      throw errorOrUndefined;
    }

    await sessionOrUndefined.save({
      userId: userDTOOrUndefined.id,
      role: userDTOOrUndefined.type,
    });
    return {
      user: userDTOOrUndefined,
    };
  }

  protected async _handleCustomerLogIn(
    session: UserSession,
    request: Request,
  ): Promise<DTOCustomerEntity> {
    let customerRegisteredDTO: DTOCustomerEntity;
    const userIdOrUndefined = session.userId;
    if (userIdOrUndefined) {
      customerRegisteredDTO = await this._readCustomerById(userIdOrUndefined);
    } else {
      customerRegisteredDTO = await this._readCustomerByEmailAndPassword(request.body);
    }
    return customerRegisteredDTO;
  }

  protected async _readCustomerById(userId: string): Promise<DTOCustomerEntity> {
    const operationResult = await this._customerEntityRepositoryCRUDImpl.read(userId);

    if (!operationResult.isSuccess) {
      throw operationResult.result;
    }

    const customerDTO: DTOCustomerEntity = this._dtoCustomerEntityFromEntityImpl.derive(
      operationResult.result as unknown as CustomerEntityImpl,
    );
    return customerDTO;
  }

  protected async _readCustomerByEmailAndPassword({
    email,
    password,
  }: UserRestAPIRequestLogInPayload): Promise<DTOCustomerEntity> {
    const useCase = new CustomerEntityUseCaseLogInImpl(this._customerEntityRepositoryCRUDImpl);
    const customerEntity: CustomerEntity | Error = await useCase.run({
      email,
      password,
    });
    if (customerEntity instanceof Error) {
      throw new HTTPErrorClientSideImpl(String(customerEntity));
    }

    const customerDTO: DTOCustomerEntity =
      this._dtoCustomerEntityFromEntityImpl.derive(customerEntity);
    return customerDTO;
  }

  // TODO: split into two separate classes

  protected async _handleAdminLogIn(
    session: UserSession,
    request: Request,
  ): Promise<DTOAdminEntity> {
    let adminRegisteredDTO: DTOAdminEntity;
    const userIdOrUndefined = session.userId;

    if (userIdOrUndefined) {
      adminRegisteredDTO = await this._readAdminById(userIdOrUndefined);
    } else {
      adminRegisteredDTO = await this._readAdminByEmailAndPassword(request.body);
    }
    return adminRegisteredDTO;
  }

  protected async _readAdminById(userId: string): Promise<DTOAdminEntity> {
    const operationResult = await this._adminEntityRepositoryCRUDImpl.read(userId);

    if (!operationResult.isSuccess) {
      throw operationResult.result;
    }

    const adminDTO: DTOAdminEntity = this._dtoAdminEntityFromEntityImpl.derive(
      operationResult.result as unknown as AdminEntity,
    );
    return adminDTO;
  }

  protected async _readAdminByEmailAndPassword({
    email,
    password,
  }: UserRestAPIRequestLogInPayload): Promise<DTOAdminEntity> {
    const useCase = new AdminEntityUseCaseLogInImpl(this._adminEntityRepositoryCRUDImpl);
    const adminEntity: AdminEntity | Error = await useCase.run({
      email,
      password,
    });
    if (adminEntity instanceof Error) {
      throw new HTTPErrorClientSideImpl(String(adminEntity));
    }

    const adminDTO: DTOAdminEntity = this._dtoAdminEntityFromEntityImpl.derive(adminEntity);
    return adminDTO;
  }
}
