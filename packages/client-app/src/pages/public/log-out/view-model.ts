import { action, observable } from "mobx";
import { RestAPIRequestDescriptionUserLogOut } from "@react-node-monorepo/infrastructure";

import { ViewModelBase, appState } from '../../../application';


export class PageLogOutViewModel extends ViewModelBase {
    @observable
    public isOpenConfirmationDialog: boolean = false
    protected readonly _appState = appState;

    @action.bound
    public onLogOutClick() {
        this._setPropValue('openRoutePath', '');
        this._setPropValueAndResetErrors('isOpenConfirmationDialog', true);
    }

    @action.bound
    public onLogOutCancelClick() {
        this._setPropValue('openRoutePath', '');
        this._setPropValueAndResetErrors('isOpenConfirmationDialog', false);
    }

    public logOut = async (): Promise<void> => {
        this._clearErrors();

        let errorOrUndefined: Error | undefined
        try {
            this._setInProgress();
            this._appServices.restAPIService.sendRequest(new RestAPIRequestDescriptionUserLogOut())
            appState.user.unsetCurrentUser();
            this._setPropValue('openRoutePath', '/');
        } catch(err) {
            errorOrUndefined = err as Error
        } finally {
            this._unsetInProgress();
        }
        this._addError(errorOrUndefined)
    }
}