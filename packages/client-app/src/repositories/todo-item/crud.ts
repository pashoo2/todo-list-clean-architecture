import { DTOTodoItemAggregate, OperationResult, OperationResultAsync, type TodoItemAggregateRepositoryCRUD } from "@react-node-monorepo/application";
import { type RestAPIService } from "../../services";
import { DTOTodoItemFromAggregateImpl, DTOTodoItemToAggregateImpl, CustomerEntityRepositoryCRUD } from '@react-node-monorepo/application';
import { 
    RestAPIRequestDescriptionTodoItemAggregateCreate, 
    TodoItemAggregateRestAPIResponseCreatePayload,
    RestAPIRequestDescriptionTodoItemAggregateUpdate,
    TodoItemAggregateRestAPIResponseUpdatePayload,
    RestAPIRequestDescriptionTodoItemAggregateRemoveAll
 } from '@react-node-monorepo/infrastructure';
import { type CustomerEntity, type TodoItemAggregate } from "@react-node-monorepo/domain";

export class TodoItemAggregateRepositoryCRUDImpl implements TodoItemAggregateRepositoryCRUD {
    protected _dtoTodoItemFromAggregateImpl = new DTOTodoItemFromAggregateImpl()
    protected _dtoTodoItemToAggregateImpl = new DTOTodoItemToAggregateImpl()
    constructor(
        protected _restAPIService: RestAPIService,
        protected _customerEntityRepositoryCRUD: CustomerEntityRepositoryCRUD
    ) {}

    public async create(entity: TodoItemAggregate): Promise<OperationResult<TodoItemAggregate>> {
        const todoItemAggregateDTO: DTOTodoItemAggregate = this._dtoTodoItemFromAggregateImpl.derive(entity);
        const request = new RestAPIRequestDescriptionTodoItemAggregateCreate({
            todoItem: todoItemAggregateDTO,
        })

        const response = await this._restAPIService.sendRequest(request) as TodoItemAggregateRestAPIResponseCreatePayload;

        const todoItemUserId: string = todoItemAggregateDTO.user
        const todoItemUserReadOperationResult = await this._customerEntityRepositoryCRUD.read(todoItemUserId)
        const todoItemUserOrUndefined: CustomerEntity | undefined = todoItemUserReadOperationResult.result;

        if (!todoItemUserOrUndefined) {
            throw new Error(`The user is not found by the id "${todoItemUserId}"`)
        }

        const todoItem: TodoItemAggregate = this._dtoTodoItemToAggregateImpl.derive(
            response.todoItem,
            { user: todoItemUserOrUndefined }
        );

        return {
            isSuccess: true,
            result: todoItem,
        };
    }
    public read(_id: string): OperationResultAsync<TodoItemAggregate | undefined> {
        throw new Error('Not implemented'); // TODO: write an implementation
    }
    public async update(entity: TodoItemAggregate): Promise<OperationResult<void>> {
        const todoItemAggregateDTO: DTOTodoItemAggregate = this._dtoTodoItemFromAggregateImpl.derive(entity);
        const request = new RestAPIRequestDescriptionTodoItemAggregateUpdate({
            todoItem: todoItemAggregateDTO,
        })

        await this._restAPIService.sendRequest(request) as TodoItemAggregateRestAPIResponseUpdatePayload;
        return {
            isSuccess: true,
            result: void undefined,
        };
    }
    public delete(_id: string): OperationResultAsync<void> {
        throw new Error('Not implemented'); // TODO: write an implementation
    }
    
    public async removeAll(): Promise<OperationResult<void>> {
        const request = new RestAPIRequestDescriptionTodoItemAggregateRemoveAll();

        await this._restAPIService.sendRequest(request) as TodoItemAggregateRestAPIResponseUpdatePayload;
        return {
            isSuccess: true,
            result: void undefined,
        };
    }
}
