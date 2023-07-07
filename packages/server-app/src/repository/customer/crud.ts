import {
  CustomerEntityRepositoryCRUDMethodLogInParameters,
  type CustomerEntityRepositoryCRUD,
  CustomerEntityRepositoryCRUDMethodSignUpParameters,
  CustomerEntityRepositoryCRUDMethodSignUpResult,
  CustomerEntityRepositoryCRUDMethodLogInResult,
  DTOCustomerEntityToEntityImpl,
  DTOCustomerEntityFromEntityImpl,
  type DTOCustomerEntity,
  OperationResultAsync,
  DateTimeSerializationServiceImpl,
  DateTimeSerializationService,
} from '@react-node-monorepo/application';
import { CustomerEntity, CustomerEntityImpl, EntityType } from '@react-node-monorepo/domain';

import {
  DataBase,
  type PasswordHash,
  type EntityUniqueIdGenerator,
  PasswordHashImpl,
} from '../../services';
import type { CustomerDataWithPassword } from './types';
import { DB_KEY_CUSTOMERS } from './const';

export class CustomerEntityRepositoryCRUDImpl implements CustomerEntityRepositoryCRUD {
  static dbKey = DB_KEY_CUSTOMERS;

  // TODO: use Dependency Injection
  protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
  protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();
  protected _dateTimeSerialization: DateTimeSerializationService =
    new DateTimeSerializationServiceImpl();
  protected _passwordHash: PasswordHash = new PasswordHashImpl();

  // TODO: implement a better cache
  protected _cache: Record<CustomerEntity['id'], CustomerEntity> = {};

  constructor(
    protected _databaseConnection: DataBase,
    protected _entityUniqueIdGenerator: EntityUniqueIdGenerator,
  ) {
    if (!_databaseConnection.has(CustomerEntityRepositoryCRUDImpl.dbKey)) {
      _databaseConnection.set(CustomerEntityRepositoryCRUDImpl.dbKey, []);
    }
  }

  public async logIn(
    parameters: CustomerEntityRepositoryCRUDMethodLogInParameters,
  ): CustomerEntityRepositoryCRUDMethodLogInResult {
    const { email, password } = parameters;

    const customers: CustomerDataWithPassword[] = this._readAllCustomers();

    const customerOrUndefined: CustomerDataWithPassword | undefined = customers.find(
      (customer: CustomerDataWithPassword) => customer.email === email.email,
    );

    if (!customerOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is no customer with the email found'),
      };
    }

    const passwordMatch: boolean = await this._passwordHash.compare({
      hash: customerOrUndefined.password,
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
      result: this._createEntityFromDTO(customerOrUndefined),
    };
  }

  public async signUp(
    parameters: CustomerEntityRepositoryCRUDMethodSignUpParameters,
  ): CustomerEntityRepositoryCRUDMethodSignUpResult {
    const { customer, password } = parameters;

    const customers: CustomerDataWithPassword[] = this._readAllCustomers();

    const customerOrUndefined: CustomerDataWithPassword | undefined = customers.find(
      (existingCustomer: CustomerDataWithPassword) =>
        existingCustomer.email === customer.email.email,
    );

    if (customerOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is already a customer with this email'),
      };
    }

    const customerId = this._entityUniqueIdGenerator();
    const dtoCustomer: DTOCustomerEntity = this._dtoCustomerEntityFromEntityImpl.derive(customer);
    const dateCreatedStringified = this._getCurrentDateStringified();

    const passwordHash: string = await this._passwordHash.calculate(password.password);

    const dtoCustomerWithIdAndPassword: CustomerDataWithPassword = {
      ...dtoCustomer,
      dateCreated: dateCreatedStringified,
      dateModified: dateCreatedStringified,
      id: customerId,
      password: passwordHash,
    };

    this._writeCustomer(dtoCustomerWithIdAndPassword);
    const customerWithIdEntity: CustomerEntity = this._dtoCustomerEntityToEntityImpl.derive(
      dtoCustomerWithIdAndPassword,
    );

    return {
      isSuccess: true,
      result: customerWithIdEntity,
    };
  }

  public async read(id: string): OperationResultAsync<CustomerEntity | undefined> {
    const customerEntityCachedOrUndefined: CustomerEntity | undefined =
      this._readCustomerEntityOrUndefinedFromCache(id);

    if (customerEntityCachedOrUndefined) {
      return {
        isSuccess: true,
        result: customerEntityCachedOrUndefined,
      };
    }

    const customerWithTheGivenIdDTOOrUndefined: CustomerDataWithPassword | undefined =
      this._getCustomerWithIdOrUndefined(id);

    if (customerWithTheGivenIdDTOOrUndefined) {
      const customerEntity: CustomerEntity = this._dtoCustomerEntityToEntityImpl.derive(
        customerWithTheGivenIdDTOOrUndefined,
      );
      this._writeCustomerEntityToCache(customerEntity);
      return {
        isSuccess: true,
        result: customerEntity,
      };
    }
    return {
      isSuccess: true,
      result: undefined,
    };
  }

  public async update(entity: CustomerEntityImpl): OperationResultAsync<void> {
    const customerWithTheGivenIdDTOOrUndefined: CustomerDataWithPassword | undefined =
      this._getCustomerWithIdOrUndefined(entity.id);

    if (!customerWithTheGivenIdDTOOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is no existing customer found'),
      } as unknown as OperationResultAsync<void>; // TODO - resolve the type cast;
    }

    const customerDTO: DTOCustomerEntity = this._dtoCustomerEntityFromEntityImpl.derive(entity);

    this._writeCustomerEntityToCache(entity);
    this._writeCustomer({
      ...customerWithTheGivenIdDTOOrUndefined,
      ...customerDTO,
      dateModified: this._getCurrentDateStringified(),
    });

    return {
      isSuccess: true,
      result: undefined,
    };
  }

  public async delete(id: string): OperationResultAsync<void> {
    const customerWithTheGivenIdDTOOrUndefined: CustomerDataWithPassword | undefined =
      this._getCustomerWithIdOrUndefined(id);

    if (!customerWithTheGivenIdDTOOrUndefined) {
      return {
        isSuccess: false,
        result: new Error('There is no existing customer found'),
      } as unknown as OperationResultAsync<void>; // TODO - resolve the type cast;
    }

    this._deleteCustomerById(id);
    return {
      isSuccess: true,
      result: undefined,
    };
  }

  protected _readAllCustomers(): CustomerDataWithPassword[] {
    const users = this._databaseConnection.get(CustomerEntityRepositoryCRUDImpl.dbKey) as
      | CustomerDataWithPassword[]
      | undefined;

    return (users ?? []).filter(user => user.type === EntityType.Customer);
  }

  protected _getCustomerWithIdOrUndefined(id: string): CustomerDataWithPassword | undefined {
    const customerWithTheGivenIdDTOOrUndefined: CustomerDataWithPassword | undefined =
      this._readAllCustomers().find(customer => customer.id === id);

    return customerWithTheGivenIdDTOOrUndefined;
  }

  protected _writeCustomer(customer: CustomerDataWithPassword): void {
    if (!customer.id) {
      throw new Error('Customer should have a non-empty identity');
    }

    const customers = this._readAllCustomers();
    const existingCustomer = customers.find(
      existingCustomer => existingCustomer.id === customer.id,
    );

    if (existingCustomer) {
      Object.assign(existingCustomer, customer);
    } else {
      customers.push(customer);
    }
    this._databaseConnection.set(CustomerEntityRepositoryCRUDImpl.dbKey, customers);
  }

  protected _deleteCustomerById(id: string): void {
    const customers = this._readAllCustomers();
    this._databaseConnection.set(
      CustomerEntityRepositoryCRUDImpl.dbKey,
      customers.filter(c => c.id !== id),
    );
    this._deleteCustomerEntityFromCache(id);
  }

  protected _createEntityFromDTO(customerData: CustomerDataWithPassword): CustomerEntity {
    return this._dtoCustomerEntityToEntityImpl.derive(customerData);
  }

  protected _getCurrentDateStringified(): string {
    return this._dateTimeSerialization.toString(new Date());
  }

  protected _readCustomerEntityOrUndefinedFromCache(id: string): CustomerEntity | undefined {
    return this._cache[id];
  }

  protected _writeCustomerEntityToCache(customer: CustomerEntity): void {
    this._cache[customer.id] = customer;
  }

  protected _deleteCustomerEntityFromCache(id: string): void {
    delete this._cache[id];
  }
}
