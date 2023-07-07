import {
  DTOCustomerEntityToEntityImpl,
  type OperationResult,
  type CustomerEntityRepositoryList,
  CustomerEntityRepositoryListFilter,
  ListFromStorage,
  DTOCustomerEntity,
  CustomerEntityRepositoryListFilterParameters,
} from '@react-node-monorepo/application';
import { CustomerEntity, EntityType } from '@react-node-monorepo/domain';
import { JSONSerializerImpl } from '@react-node-monorepo/infrastructure';
import type { CustomerDataWithPassword } from '../types';
import { DB_KEY_CUSTOMERS } from '../const';
import { type DataBase } from '../../../services';

export class CustomerEntityRepositoryListImpl implements CustomerEntityRepositoryList {
  static dbKey = DB_KEY_CUSTOMERS;
  // TODO: use Dependency Injection
  protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
  protected _JSONSerializerImpl = new JSONSerializerImpl();

  constructor(protected _databaseConnection: DataBase) {}

  public async read(
    filter: CustomerEntityRepositoryListFilter,
  ): Promise<OperationResult<ListFromStorage<CustomerEntity>>> {
    const filterQuery: string = filter.toQuery(); // TODO: it should be a database SQL string or another type in case of a NoSQL database
    // TODO: this won't be necessary with a real database
    const filterQueryParsed = this._JSONSerializerImpl.parse(
      filterQuery,
    ) as unknown as CustomerEntityRepositoryListFilterParameters;
    const { count, offset, name } = filterQueryParsed;

    const customers: CustomerDataWithPassword[] = this._readAllCustomers();
    let customersFiltered: CustomerDataWithPassword[] = customers.slice(
      Number(offset),
      Number(offset + count),
    );

    if (name) {
      customersFiltered = customersFiltered.filter(customer => customer.name === name);
    }

    return {
      isSuccess: true,
      result: {
        offset: Number(offset),
        total: customers.length,
        values: customersFiltered.map(this.$createCustomerEntityFromDTO),
      },
    };
  }

  protected _readAllCustomers(): CustomerDataWithPassword[] {
    const users = this._databaseConnection.get(CustomerEntityRepositoryListImpl.dbKey) as
      | CustomerDataWithPassword[]
      | undefined;

    return (users ?? []).filter(users => users.type === EntityType.Customer);
  }

  private $createCustomerEntityFromDTO = (customerDTO: DTOCustomerEntity): CustomerEntity =>
    this._dtoCustomerEntityToEntityImpl.derive(customerDTO);
}
