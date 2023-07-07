import { type RestAPIService } from "../../../services";
import type { AppServicesDIContainer } from "../types";
import { createRestAPIService } from "./rest-api";

// TODO: add a decorator that will work as `@inject("service_name")`
export class ApplicationDIContainerImpl implements AppServicesDIContainer {
    static _applicationDIContainerImpl?: AppServicesDIContainer;
    public get restAPIService(): RestAPIService {
        return this._restAPIService;
    }
    protected readonly _restAPIService: RestAPIService;
    constructor() {
        const applicationDIContainerImplOrUndefined = ApplicationDIContainerImpl._applicationDIContainerImpl
        if (applicationDIContainerImplOrUndefined) {
            return applicationDIContainerImplOrUndefined as ApplicationDIContainerImpl;
        }
        this._restAPIService = createRestAPIService();
    }
}
