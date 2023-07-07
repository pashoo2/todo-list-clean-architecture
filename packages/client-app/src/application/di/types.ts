import type { RestAPIService } from "../../services";

export interface AppServicesDIContainer {
    readonly restAPIService: RestAPIService;
}
