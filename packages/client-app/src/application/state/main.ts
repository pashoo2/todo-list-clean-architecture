import { makeAutoObservable } from 'mobx'
import { AppStateUser } from "./user";

export class AppState {
    public user = new AppStateUser();
    
    constructor() {
        makeAutoObservable(this);
    }
}
