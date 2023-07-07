import { action, computed, observable } from "mobx";
import { TodoItemAggregateImpl, type TodoItemAggregate } from "@react-node-monorepo/domain";
import { 
    CustomerEntityUseCaseReadTodoListImpl,
    TodoItemAggregateRepositoryListFilter,
    type CustomerEntityRepositoryCRUD,
    type TodoItemAggregateRepositoryList,
    CustomerEntityUseCaseUpdateTodoItemImpl,
    TodoItemAggregateRepositoryCRUD
 } from "@react-node-monorepo/application";
import { 
    type CompareForSortFunction,
    TodoItemAggregateRepositoryListFilterImpl,
    compareTodoItemsByDescription,
    type CompareTodoItemsByDescriptionValue,
} from "@react-node-monorepo/infrastructure";


import { ViewModelBase, appState } from '../../../application';
import { CustomerEntityRepositoryCRUDImpl, TodoItemAggregateRepositoryCRUDImpl, TodoItemAggregateRepositoryListImpl } from "../../../repositories";
import { RestAPIService } from "../../../services";

export class CustomerPageTodoItemsViewModelList extends ViewModelBase {
    @computed
    public get list(): TodoItemAggregate[] {
        const arr = []
        this._cacheTodoItems.forEach(value => {
            arr.push(value)
        })
        return arr.sort(this._compareForSortDTOTodoItem);
    }
    @observable
    public todoItemDescriptionFilter: string = ''
    @observable
    public total: number = 0
    @observable
    public offset: number = 0
    @computed
    public get isPossibleToOpenNextPage(): boolean {
        return !this.isInProgress && !this.isReachedEnd
    }
    @computed
    public get isReachedEnd(): boolean {
        return (this.offset + this.list.length) >= this.total
    }
    @computed
    public get isPossibleToOpenPrevPage(): boolean {
        return !this.isInProgress && this.offset > 0
    }
    protected _offsetToLoad = 0
    protected _countToLoadPerPage = 8
    protected _countToLoad = this._countToLoadPerPage
    protected _loadingThresholdMS = 1000
    protected readonly _appState = appState;
    protected readonly _filter: TodoItemAggregateRepositoryListFilter = new TodoItemAggregateRepositoryListFilterImpl();
    protected readonly _todoItemAggregateRepositoryList: TodoItemAggregateRepositoryList;
    protected readonly _todoItemAggregateRepositoryCRUD: TodoItemAggregateRepositoryCRUD;
    protected readonly _todoIte
    protected readonly _lastLoaded: Date | null = null
    protected _isLastElementVisible: boolean = false
    protected _cacheTodoItems = observable.map(new Map<TodoItemAggregate['id'], TodoItemAggregate>())
    protected get _isNextLoadingOverdue(): boolean {
        if (!this._lastLoaded) {
            return true;
        }
        return (Number(new Date()) - Number(this._lastLoaded)) > this._loadingThresholdMS; 
    }
    protected _compareForSortDTOTodoItem: CompareForSortFunction<CompareTodoItemsByDescriptionValue> = compareTodoItemsByDescription;
    
    constructor(
        protected readonly _isDoneTodoItems: boolean
    ) {
        super();
        const restAPIService: RestAPIService = this._appServices.restAPIService
        const customerEntityRepositoryCRUD: CustomerEntityRepositoryCRUD = new CustomerEntityRepositoryCRUDImpl(restAPIService)
        
        this._todoItemAggregateRepositoryCRUD = new TodoItemAggregateRepositoryCRUDImpl(
            restAPIService,
            customerEntityRepositoryCRUD
        )
        this._todoItemAggregateRepositoryList = new TodoItemAggregateRepositoryListImpl(
            restAPIService,
            customerEntityRepositoryCRUD
        )

        TodoItemAggregateImpl.subscribeTodoItemStatusChange(this.$handleTodoItemStatusChange)
        TodoItemAggregateImpl.subscribeNewTodoItem(this.$handleNewTodoItem)
    }

    public load = async (): Promise<void> => {
        if (this.isInProgress) {
            return;
        }
        // TODO: schedule next loading
        if (!this._isNextLoadingOverdue) {
            return;
        }

        try {
            await this._load()
            await this._loadNextPage()
        } catch(err) {
            this._addError(err)
        } finally {
            this._unsetInProgress();
        }
    }

    public setDescriptionFilter = (value: string): void => {
        this._setPropValue('todoItemDescriptionFilter', value)
        this._setPropValue('offset', 0)
        this._setPropValue('_offsetToLoad', 0)
        this._clearCurrentList()
        this._load()
    }

    public loadNext = async (): Promise<void> => {
        if (this.isInProgress) {
            return;
        }
        // TODO: schedule next loading
        if (!this._isNextLoadingOverdue) {
            return;
        }
        
        try {
            await this._loadNextPage()
        } catch(err) {
            this._addError(err)
        }
    }

    public deleteAll = () => {
        this._clearCurrentList();
    }

    public destroy() {
        this._clearCurrentList();
        TodoItemAggregateImpl.unSubscribeTodoItemStatusChange(this.$handleTodoItemStatusChange);
        TodoItemAggregateImpl.unSubscribeNewTodoItem(this.$handleNewTodoItem)
    }

    public onLastElementVisibilityChange = (isVisible: boolean) => {
        this._isLastElementVisible = isVisible;
    }

    @action.bound
    public onTodoItemStatusChange(todoItemId: string, isDone: boolean): void {
        const todoItemWithChangedStatus = this._findTodoItemOrUndefinedById(todoItemId)
        
        this._updateTodoItemStatus(todoItemWithChangedStatus, isDone)
        this._updateTodoItemAfterStatusChange(todoItemWithChangedStatus)
    }

    protected _loadNextPage = async (): Promise<void> => {
        if (this.isReachedEnd) {
            return;
        }
        this._offsetToLoad = Number(this.offset + this.list.length);
        this._countToLoad = Math.min(this._countToLoadPerPage, this.total - this._countToLoadPerPage)
        await this._load()
        if (this._isLastElementVisible) {
            await this._loadNextPage()
        }
    }

    @action
    protected _updateTodoItemStatus(
        todoItemAggregate: TodoItemAggregate,
        isDone: boolean
    ): void {
        if (isDone) {
            todoItemAggregate.setIsDone();
        } else {
            todoItemAggregate.unsetIsDone();
        }
    }

    protected async _load(): Promise<void> {
        this._clearErrors();
        this._setInProgress()
        try {
            const useCase = new CustomerEntityUseCaseReadTodoListImpl(
                this._todoItemAggregateRepositoryList,
                this._filter,
            )
            const parameters = {
                count: this._countToLoad,
                offset: this._offsetToLoad,
                isDone: this._isDoneTodoItems,
                description: this.todoItemDescriptionFilter 
                    ? encodeURIComponent(this.todoItemDescriptionFilter)
                    : undefined
            }

            const customersList = await useCase.run(parameters)
            if (customersList instanceof Error) {
                throw customersList;
            }
            this._updateList(customersList.values);
            this._setPropValue('total', customersList.total)
            this._setPropValue('offset', customersList.offset)
        } finally {
            this._unsetInProgress();
        }
        
    }

    protected async _updateTodoItemAfterStatusChange(
        todoItemAggregate: TodoItemAggregate
    ): Promise<void> {
        this._setInProgress()
        const newStatusIsDone: boolean = todoItemAggregate.isDone
        try {
            const useCase = new CustomerEntityUseCaseUpdateTodoItemImpl(
                this._todoItemAggregateRepositoryCRUD,
            )
            await useCase.run({
                todoItem: todoItemAggregate,
            })
            this._deleteFromList(todoItemAggregate.id);
        } catch(err) {
            this._addError(err)
            // rollback status
            this._updateTodoItemStatus(todoItemAggregate, !newStatusIsDone)
        } finally {
            this._unsetInProgress()
        }
    }

    @action
    protected _updateList(
        totoItems: TodoItemAggregate[]
    ): void {
        totoItems.forEach(todoItem => {
            this._cacheTodoItems.set(todoItem.id, todoItem)
        })
    }

    @action
    protected _clearCurrentList(): void {
        this._cacheTodoItems.clear()
    }
    

    protected _findTodoItemOrUndefinedById = (todoItemId: string) => {
        return  this._cacheTodoItems.get(todoItemId)
    }

    @action
    protected _deleteFromList(todoItemId: string): void {
        this._cacheTodoItems.delete(todoItemId)
    }

    private $handleTodoItemStatusChange = action((todoItem: TodoItemAggregate): void => {
        if (this._isDoneTodoItems === todoItem.isDone) {
            this._cacheTodoItems.set(todoItem.id, todoItem)
        } else {
            this._cacheTodoItems.delete(todoItem.id)
        }
    })

    private $handleNewTodoItem = (todoItem: TodoItemAggregate): void => {
        const id = todoItem.id
        if (!id || !todoItem.dateCreated)  {
            return;
        }
        if (this._isDoneTodoItems === todoItem.isDone) {
            this._updateList([todoItem])
        }
    }
}
