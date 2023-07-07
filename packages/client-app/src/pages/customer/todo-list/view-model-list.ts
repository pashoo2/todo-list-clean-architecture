import { action, computed, observable } from "mobx";
import { type TodoItemAggregate } from "@react-node-monorepo/domain";
import { type TodoItemAggregateRepositoryListFilterParameters } from "@react-node-monorepo/application";

import { ViewModelBase, appState } from '../../../application';

export class CustomerPageTodoItemsViewModelList extends ViewModelBase {
    @observable
    public list: TodoItemAggregate[] = []
    @observable
    public total: number = 0
    @observable
    public offset: number = 0
    @computed
    public get isPossibleToOpenNextPage(): boolean {
        return !this.isInProgress && (this.offset + this.list.length) < this.total
    }
    @computed
    public get isPossibleToOpenPrevPage(): boolean {
        return !this.isInProgress && this.offset > 0
    }
    protected _offsetToLoad = 0
    protected _countToLoadPerPage = 10
    protected _countToLoad = this._countToLoadPerPage
    protected readonly _appState = appState;
    protected readonly _filter?: TodoItemAggregateRepositoryListFilterParameters;

    public load = async (): Promise<void> => {
        // this._clearErrors();
        // this._setInProgress();

        // try {
        //     const useCase = new AdminEntityUseCaseReadCustomerListImpl(
        //         this._customerEntityRepositoryListImpl,
        //         this._customerEntityListRepoFilter,
        //     )
        //     const parameters = {
        //         count: this._countToLoad,
        //         offset: this._offsetToLoad,
        //     }
        //     const customersList = await useCase.run(parameters)
        //     if (customersList instanceof Error) {
        //         throw customersList;
        //     }
        //     this._updateList(customersList.values);
        //     this._setPropValue('total', customersList.total)
        //     this._setPropValue('offset', customersList.offset)
        // } catch(err) {
        //     this._addError(err)
        // } finally {
        //     this._unsetInProgress();
        // }
    
    }

    public loadNextPage = async (): Promise<void> => {
        if (!this.isPossibleToOpenNextPage) {
            return;
        }
        this._offsetToLoad = Number(this.offset + this.list.length);
        this._countToLoad = Math.min(this._countToLoadPerPage, this.total - this._countToLoadPerPage)
        await this.load()
    }

    public loadPrevPage = async (): Promise<void> => {
        if (!this.isPossibleToOpenPrevPage) {
            return;
        }
        const countToLoad = Math.min(this._countToLoadPerPage, this.offset);
        this._offsetToLoad = Math.max(0, Number(this.offset - countToLoad));
        this._countToLoad = countToLoad
        await this.load()
    }

    @action
    protected _updateList(
        entities: TodoItemAggregate[]
    ) {
        this.list.splice(0, this.list.length)
        this.list.push(...entities)
    }
}
