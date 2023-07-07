import { computed, makeObservable, observable } from "mobx";
import { AdminEntity, CustomerEntity, EntityType, ToDoItemDescriptionVOImpl, TodoItemAggregateImpl } from "@react-node-monorepo/domain";
import { CustomerEntityUseCaseAddTodoItemImpl, type CustomerEntityRepositoryCRUD, type TodoItemAggregateRepositoryCRUD, CustomerEntityUseCaseTodoItemRemoveAllImpl } from "@react-node-monorepo/application";

import { ViewModelBase, appState } from "../../../application";
import { CustomerEntityRepositoryCRUDImpl, TodoItemAggregateRepositoryCRUDImpl } from "../../../repositories";
import { type RestAPIService } from '../../../services/types/rest-api';
import { type AppState } from "../../../application/state/main";

export class CustomerPageTodoItemsViewModel extends ViewModelBase {
    @observable
    public todoItemDescription: string = '';
    protected readonly _customerEntityRepositoryCRUD: CustomerEntityRepositoryCRUD
    protected readonly _todoItemAggregateRepositoryCRUD: TodoItemAggregateRepositoryCRUD
    @computed
    protected get _appState(): AppState {
        return appState;
    }
    constructor() {
        super()
        makeObservable(this);

        const restAPIService: RestAPIService = this._appServices.restAPIService;
        const customerEntityRepositoryCRUD = new CustomerEntityRepositoryCRUDImpl(restAPIService)
        
        this._customerEntityRepositoryCRUD = customerEntityRepositoryCRUD;
        this._todoItemAggregateRepositoryCRUD = new TodoItemAggregateRepositoryCRUDImpl(
            restAPIService,
            customerEntityRepositoryCRUD
        )
    }
    
    public deleteAll = async () => {
        this._setInProgress();
        try {
            const useCase = new CustomerEntityUseCaseTodoItemRemoveAllImpl(
                this._todoItemAggregateRepositoryCRUD
            )
            // TODO: add a domain event and clean view models only if success
            await useCase.run()
        } finally {
            this._unsetInProgress()
        }
    }

    public setTODOItemDescription = (description: string): void => {
        this._setPropValue('todoItemDescription', description);
    }

    public createTodoItemFromDescription = async (): Promise<void> => {
        this._setInProgress();
        this._clearErrors();

        try {
            const userOrNull:  CustomerEntity | AdminEntity | null = this._appState.user.userOrNull;
            if (!userOrNull) {
                throw new Error('The current user is not defined')
            }
            if (userOrNull.type === EntityType.Admin) {
                throw new Error('The admin user is not allowed to create a TODO item')
            }
            const todoItem = new TodoItemAggregateImpl({
                description: new ToDoItemDescriptionVOImpl(this.todoItemDescription),
                id: '',
                isDone: false,
                user: userOrNull,
            })

            const useCase = new CustomerEntityUseCaseAddTodoItemImpl(
                this._todoItemAggregateRepositoryCRUD
            )
            await useCase.run({
                todoItem,
            })
        } catch(err) {
            this._addError(err)
        }finally {
            this._unsetInProgress()
        }
    }
}