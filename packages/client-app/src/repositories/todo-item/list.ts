import { CustomerEntityRepositoryCRUD, DTOTodoItemAggregate, DTOTodoItemToAggregateImpl, TodoItemAggregateRepositoryList, TodoItemAggregateRepositoryListFilter } from "@react-node-monorepo/application";

import {
    type OperationResult,
    ListFromStorage,
  } from '@react-node-monorepo/application';
  import { TodoItemAggregate } from '@react-node-monorepo/domain';
  import {
    type HttpError,
    OperationResultByHttpError,
    RestAPIRequestDescriptionTodoItemAggregateList,
    TodoItemAggregateRestAPIResponseListPayload,
  } from "@react-node-monorepo/infrastructure";

  import { type RestAPIService } from "../../services";
    
  // TODO: share logic between client and server apps
  export class TodoItemAggregateRepositoryListImpl implements TodoItemAggregateRepositoryList {
    // TODO: use Dependency Injection
    protected _dtoTodoItemToAggregateImpl = new DTOTodoItemToAggregateImpl();

    constructor(
      protected _restAPIService: RestAPIService,
      protected _customerEntityRepositoryCRUD: Pick<CustomerEntityRepositoryCRUD, 'read'>
    ) {}

    // TODO: cache values
    public async read(filter: TodoItemAggregateRepositoryListFilter): Promise<OperationResult<ListFromStorage<TodoItemAggregate>>> {
      const filterQuery: string = filter.toQuery()
      const request = new RestAPIRequestDescriptionTodoItemAggregateList(filterQuery as any) // TODO: resolve any
      try {
          const response = await this._restAPIService.sendRequest(request) as TodoItemAggregateRestAPIResponseListPayload;
  
          return {
              isSuccess: true,
              result: {
                  ...response,
                  values: await Promise.all(response.values.map(this.$createTodoItemAggregateFromDTO))
              }
          }
      } catch(err) {
          return this._getOperationResult(err)
      }
    }

    protected _getOperationResult(err): OperationResult<typeof err> {
      return new OperationResultByHttpError(err as Error | HttpError);
    }

    private $createTodoItemAggregateFromDTO = async (todoItemDTO: DTOTodoItemAggregate): Promise<TodoItemAggregate> => {
        const todoItemDTOUserId = todoItemDTO.user;
        const todoItemDTOUserIdReadOperationResult = await this._customerEntityRepositoryCRUD.read(todoItemDTOUserId)
        
        if (!todoItemDTOUserIdReadOperationResult.isSuccess) {
            throw todoItemDTOUserIdReadOperationResult.result
        }

        const todoItemDTOUserOrUndefined = todoItemDTOUserIdReadOperationResult.result;
        if (!todoItemDTOUserOrUndefined) {
            throw new Error(`There is no user with the id "${todoItemDTOUserId}" found`)
        }
        
        return this._dtoTodoItemToAggregateImpl.derive(todoItemDTO, {
            user: todoItemDTOUserOrUndefined
        })
    }
  }
    