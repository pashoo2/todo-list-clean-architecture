import { action, computed, makeObservable, observable } from "mobx";
import { type AppServicesDIContainer, ApplicationDIContainerImpl } from "../../../di";

export class ViewModelBase {
    @computed
    public get errors(): Error[] {
        return Object.values(this._errors)
    }

    public get isError(): boolean {
        return Boolean(this.errors.length);
    }
    @observable
    public isInProgress: boolean = false
    @observable
    public openRoutePath: string | null = null;
    
    // TODO: refine the container to return only necessary services
    protected _appServices: AppServicesDIContainer = new ApplicationDIContainerImpl()
    
    /**
     * A "key - value" data structure, where the key is the error message
     * and value is an Error object itself.
     * 
     * This is to avoid duplicates between errors having the same meaning.
     *
     * @protected
     * @type {Record<string, Error>}
     */
    @observable
    protected _errors: Record<string, Error> = {}

    constructor() {
        makeObservable(this);
    }

    @action.bound
    protected _setInProgress(): void {
        this.isInProgress = true;
    }

    @action.bound
    protected _unsetInProgress(): void {
        this.isInProgress = false;
    }

    @action.bound
    protected _addError(err: Error): void {
        if (!err) {
            return;
        }
        this._errors[err.message] = err;
    }

    @action.bound
    protected _clearErrors(): void {
        this._errors = {};
    }  
    
    @action.bound
    protected _setPropValue(name: string, value: unknown): void {
        (this as any)[name] = value;
    }

    protected _setPropValueAndResetErrors(name: string, value: unknown): void {
        this._setPropValue(name, value)
        this._clearErrors();
    }
}