import { makeObservable, observable } from "mobx";
import { CustomerEntityUseCaseSignUpImpl, type CustomerEntityRepositoryCRUD } from "@react-node-monorepo/application";
import { 
    EmailVOImpl,
    CustomerEntityImpl,
    UserNameVOImpl,
} from "@react-node-monorepo/domain";

import { ViewModelBase } from '../../../application';
import { PUBLIC_ROUTES_PATHS, getRoutePath } from "../../../routes";
import { CustomerEntityRepositoryCRUDImpl } from "../../../repositories";

export class PageSignUpViewModel extends ViewModelBase {
    @observable
    public email: string = ''

    @observable
    public password: string = ''
    @observable
    public name: string = ''
    @observable
    public isSuccess: boolean = false
    protected readonly _customerEntityRepositoryCRUDImpl: CustomerEntityRepositoryCRUD;

    constructor() {
        super()
        makeObservable(this);
        this._customerEntityRepositoryCRUDImpl = new CustomerEntityRepositoryCRUDImpl(
            this._appServices.restAPIService
        )
    }
    
    public setName = (name: string): void => {
        this._setPropValueAndResetErrors("name", name)
    }

    public setEmail = (email: string): void => {
        this._setPropValueAndResetErrors("email", email)
    }

    public setPassword = (password: string): void => {
        this._setPropValueAndResetErrors("password", password)
    }

    public submit = async (): Promise<void> => {
        this._clearErrors()

        try {
            const customer = new CustomerEntityImpl({
                email: new EmailVOImpl(this.email),
                id: '',
                name: new UserNameVOImpl(this.name),
            });
            const useCase = new CustomerEntityUseCaseSignUpImpl(this._customerEntityRepositoryCRUDImpl);
            const customerEntityImplOrError: CustomerEntityImpl | Error = await useCase.run({
                customer,
                password: this.password,
            });
            if (customerEntityImplOrError instanceof Error) {
                throw customerEntityImplOrError;
            }
            this._setPropValue('isSuccess', true)
        } catch(err) {
            this._addError(err)
        }

        if (this.isError) {
            return;
        }
    }

    public openSignIn = () => {
        // TODO: react-router-dom navigation doesn't work for any reason 
        // openRoutePath(PUBLIC_ROUTES_PATHS, 'signIn')
        this._setPropValue('openRoutePath', getRoutePath(PUBLIC_ROUTES_PATHS, 'signIn'))
    }
}