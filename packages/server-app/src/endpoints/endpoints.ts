import { CustomerEntityRepositoryCRUDImpl, CustomerEntityRepositoryListImpl } from '../repository';
import { type Endpoint } from './types';
import { EndpointCustomerEntityReadById } from './customer';
import { DataBase, EntityUniqueIdGenerator } from '../services';
import { EndpointPublicUserEntitySignIn } from './customer';
import { EndpointPrivateCustomerList } from './admin';
import { EndpointPublicUserEntityLogOut } from './user';
import { AdminEntityRepositoryCRUDImpl } from '../repository/admin';
import { EndpointTodoItemAggregateCreate } from './todo-item/crud/create';
import { TodoItemAggregateRepositoryCRUDImpl } from '../repository/todo-item';

// TODO: create endpoints in a respective place
export async function createEndpoints(
  databaseConnection: DataBase,
  entityUniqueIdGenerator: EntityUniqueIdGenerator,
): Promise<Endpoint<unknown>[]> {
  const repositoryCRUDCustomer = new CustomerEntityRepositoryCRUDImpl(
    databaseConnection,
    entityUniqueIdGenerator,
  );
  const repositoryCRUDAdmin = new AdminEntityRepositoryCRUDImpl(
    databaseConnection,
    entityUniqueIdGenerator,
  );
  const todoItemAggregateRepositoryCRUDImpl = new TodoItemAggregateRepositoryCRUDImpl(
    databaseConnection,
    entityUniqueIdGenerator,
  );

  const endpointPublicCustomerEntitySignUp = new EndpointCustomerEntityReadById(
    repositoryCRUDCustomer,
  );
  const endpointCustomerEntityReadById = new EndpointCustomerEntityReadById(repositoryCRUDCustomer);

  const endpointPublicUserEntityLogIn = new EndpointPublicUserEntitySignIn(
    repositoryCRUDCustomer,
    repositoryCRUDAdmin,
  );
  const endpointPublicCustomerEntityLogOut = new EndpointPublicUserEntityLogOut();

  const repositoryListCustomer = new CustomerEntityRepositoryListImpl(databaseConnection);
  const endpointPrivateCustomerList = new EndpointPrivateCustomerList(repositoryListCustomer);

  const endpointTodoItemAggregateCreate = new EndpointTodoItemAggregateCreate(
    todoItemAggregateRepositoryCRUDImpl,
    repositoryCRUDCustomer,
  );

  return [
    endpointPublicCustomerEntityLogOut,
    endpointPublicCustomerEntitySignUp,
    endpointPublicUserEntityLogIn,
    endpointPrivateCustomerList,
    endpointCustomerEntityReadById,
    endpointTodoItemAggregateCreate,
  ];
}
