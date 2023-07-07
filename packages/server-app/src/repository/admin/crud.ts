import {
  type DTOAdminEntity,
  OperationResultAsync,
  DateTimeSerializationServiceImpl,
  DateTimeSerializationService,
  AdminEntityRepositoryCRUD,
  DTOAdminEntityToEntityImpl,
  DTOAdminEntityFromEntityImpl,
  AdminEntityRepositoryCRUDMethodLogInParameters,
  AdminEntityRepositoryCRUDMethodLogInResult,
  AdminEntityRepositoryCRUDMethodCreateParameters,
} from '@react-node-monorepo/application';
import { AdminEntity, EntityType } from '@react-node-monorepo/domain';

import {
  DataBase,
  PasswordHash,
  type EntityUniqueIdGenerator,
  PasswordHashImpl,
} from '../../services';
import type { AdminDataWithPassword } from './types';
import { DB_KEY_USERS } from './const';

export class AdminEntityRepositoryCRUDImpl implements AdminEntityRepositoryCRUD {
  static dbKey = DB_KEY_USERS;

  // TODO: use Dependency Injection
  protected _dtoAdminEntityToEntityImpl = new DTOAdminEntityToEntityImpl();
  protected _dtoAdminEntityFromEntityImpl = new DTOAdminEntityFromEntityImpl();
  protected _dateTimeSerialization: DateTimeSerializationService =
    new DateTimeSerializationServiceImpl();
  protected _passwordHash: PasswordHash = new PasswordHashImpl();

  constructor(
    protected _databaseConnection: DataBase,
    protected _entityUniqueIdGenerator: EntityUniqueIdGenerator,
  ) {
    if (!_databaseConnection.has(AdminEntityRepositoryCRUDImpl.dbKey)) {
      _databaseConnection.set(AdminEntityRepositoryCRUDImpl.dbKey, []);
    }
  }

  public async logIn(
    parameters: AdminEntityRepositoryCRUDMethodLogInParameters,
  ): AdminEntityRepositoryCRUDMethodLogInResult {
    const { email, password } = parameters;

    const admins: AdminDataWithPassword[] = this._readAllAdmins();

    const adminOrUndefined: AdminDataWithPassword | undefined = admins.find(
      (Admin: AdminDataWithPassword) => Admin.email === email.email,
    );

    if (!adminOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is no user with the email found'),
      };
    }

    const passwordMatch: boolean = await this._passwordHash.compare({
      hash: adminOrUndefined.password,
      password: password.password,
    });
    if (!passwordMatch) {
      return {
        isSuccess: false,
        result: new Error('The password is not valid'),
      };
    }

    return {
      isSuccess: true,
      result: this._createEntityFromDTO(adminOrUndefined),
    };
  }

  public async create(
    parameters: AdminEntityRepositoryCRUDMethodCreateParameters,
  ): OperationResultAsync<AdminEntity | Error> {
    const { admin, password } = parameters;

    const admins: AdminDataWithPassword[] = this._readAllAdmins();

    const adminOrUndefined: AdminDataWithPassword | undefined = admins.find(
      (existingAdmin: AdminDataWithPassword) => existingAdmin.email === admin.email.email,
    );

    if (adminOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is already a Admin with this email'),
      };
    }

    const adminId = this._entityUniqueIdGenerator();
    const dtoAdmin: DTOAdminEntity = this._dtoAdminEntityFromEntityImpl.derive(admin);
    const dateCreatedStringified = this._getCurrentDateStringified();
    const dtoAdminWithIdAndPassword: AdminDataWithPassword = {
      ...dtoAdmin,
      dateCreated: dateCreatedStringified,
      dateModified: dateCreatedStringified,
      id: adminId,
      password: password.password,
    };

    this._writeAdmin(dtoAdminWithIdAndPassword);
    const userWithIdEntity: AdminEntity =
      this._dtoAdminEntityToEntityImpl.derive(dtoAdminWithIdAndPassword);

    return {
      isSuccess: true,
      result: userWithIdEntity,
    };
  }

  public async read(id: string): OperationResultAsync<AdminEntity | undefined> {
    const adminWithTheGivenIdDTOOrUndefined: AdminDataWithPassword | undefined =
      this._getAdminWithIdOrUndefined(id);

    if (adminWithTheGivenIdDTOOrUndefined) {
      return {
        isSuccess: true,
        result: this._dtoAdminEntityToEntityImpl.derive(adminWithTheGivenIdDTOOrUndefined),
      };
    }
    return {
      isSuccess: true,
      result: undefined,
    };
  }

  public async update(entity: AdminEntity): OperationResultAsync<void> {
    const adminWithTheGivenIdDTOOrUndefined: AdminDataWithPassword | undefined =
      this._getAdminWithIdOrUndefined(entity.id);

    if (!adminWithTheGivenIdDTOOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('The user was not found'),
      } as unknown as OperationResultAsync<void>; // TODO - resolve the type cast;
    }

    const adminDTO: DTOAdminEntity = this._dtoAdminEntityFromEntityImpl.derive(entity);

    this._writeAdmin({
      ...adminWithTheGivenIdDTOOrUndefined,
      ...adminDTO,
      dateModified: this._getCurrentDateStringified(),
    });

    return {
      isSuccess: true,
      result: undefined,
    };
  }

  public async delete(id: string): OperationResultAsync<void> {
    const adminWithTheGivenIdDTOOrUndefined: AdminDataWithPassword | undefined =
      this._getAdminWithIdOrUndefined(id);

    if (!adminWithTheGivenIdDTOOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is no user'),
      } as unknown as OperationResultAsync<void>; // TODO - resolve the type cast;
    }

    this._deleteAdminById(id);
    return {
      isSuccess: true,
      result: undefined,
    };
  }

  protected _readAllAdmins(): AdminDataWithPassword[] {
    const users = this._databaseConnection.get(AdminEntityRepositoryCRUDImpl.dbKey) as
      | AdminDataWithPassword[]
      | undefined;

    return (users ?? []).filter(user => user.type === EntityType.Admin);
  }

  protected _getAdminWithIdOrUndefined(id: string): AdminDataWithPassword | undefined {
    const adminWithTheGivenIdDTOOrUndefined: AdminDataWithPassword | undefined =
      this._readAllAdmins().find(Admin => Admin.id === id);

    return adminWithTheGivenIdDTOOrUndefined;
  }

  protected _writeAdmin(admin: AdminDataWithPassword): void {
    if (!admin.id) {
      throw new Error('Admin should have a non-empty identity');
    }

    const admins = this._readAllAdmins();
    const existingAdmin = admins.find(existingAdmin => existingAdmin.id === admin.id);

    if (existingAdmin) {
      Object.assign(existingAdmin, admin);
    } else {
      admins.push(admin);
    }
    this._databaseConnection.set(AdminEntityRepositoryCRUDImpl.dbKey, admins);
  }

  protected _deleteAdminById(id: string): void {
    const users = this._readAllAdmins();
    this._databaseConnection.set(
      AdminEntityRepositoryCRUDImpl.dbKey,
      users.filter(c => c.id !== id),
    );
  }

  protected _createEntityFromDTO(adminData: AdminDataWithPassword): AdminEntity {
    return this._dtoAdminEntityToEntityImpl.derive(adminData);
  }

  protected _getCurrentDateStringified(): string {
    return this._dateTimeSerialization.toString(new Date());
  }
}
