import { CustomerEntityUseCaseLogInImpl, type CustomerEntityRepositoryCRUD, AdminEntityRepositoryCRUD, AdminEntityUseCaseLogInImpl } from "@react-node-monorepo/application";
import { observable } from "mobx";
import { type AdminEntity, type CustomerEntityImpl } from "@react-node-monorepo/domain";

import { ViewModelBase, appState } from '../../../application';
import { CustomerEntityRepositoryCRUDImpl, AdminEntityRepositoryCRUDImpl } from "../../../repositories";

export class PageLogInViewModel extends ViewModelBase {
    @observable
    public email: string = ''

    @observable
    public password: string = ''
    @observable
    public isSuccess: boolean = false
    protected readonly _appState = appState;
    protected readonly _customerEntityRepositoryCRUDImpl: CustomerEntityRepositoryCRUD;
    protected readonly _adminEntityRepositoryCRUDImpl: AdminEntityRepositoryCRUD;

    constructor() {
        super();
        this._customerEntityRepositoryCRUDImpl = new CustomerEntityRepositoryCRUDImpl(
            this._appServices.restAPIService
        );
        this._adminEntityRepositoryCRUDImpl = new AdminEntityRepositoryCRUDImpl(
            this._appServices.restAPIService
        );
    }
    public setEmail = (email: string): void => {
        this._setPropValueAndResetErrors("email", email)
    }

    public setPassword = (password: string): void => {
        this._setPropValueAndResetErrors("password", password)
    }

    public submit = async (): Promise<void> => {
        this._clearErrors();

        let errorOrUndefined: Error | undefined
        try {
            const useCase = new CustomerEntityUseCaseLogInImpl(this._customerEntityRepositoryCRUDImpl)
            const customerEntity = await useCase.run({
                email: this.email,
                password: this.password,
            })
            this._setPropValue('openRoutePath', '/customers')
            appState.user.setCurrentUser(customerEntity as CustomerEntityImpl);
            return;
        } catch(err) {
            errorOrUndefined = err as Error
        }
        try {
            const useCase = new AdminEntityUseCaseLogInImpl(this._adminEntityRepositoryCRUDImpl)
            const adminEntity = await useCase.run({
                email: this.email,
                password: this.password,
            })
            appState.user.setCurrentUser(adminEntity as AdminEntity);
            this._setPropValue('isSuccess', true)
            this._setPropValue('openRoutePath', '/')
            return;
        } catch(err) {
            errorOrUndefined = err as Error
        }
        this._addError(errorOrUndefined)
    }
}