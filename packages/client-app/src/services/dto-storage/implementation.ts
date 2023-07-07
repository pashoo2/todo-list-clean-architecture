import { JSONSerializerImpl, Serializer } from "@react-node-monorepo/infrastructure";
import type { StorageAPI } from "./types"
import type { DTOStorage } from "../types";
import { type DTOForEntityCommonFields } from "@react-node-monorepo/application";
import { type EntityType } from "@react-node-monorepo/domain";

export class DTOStorageImpl implements DTOStorage {
    // TODO: inject with DI
    protected _storageImpl: StorageAPI = window.sessionStorage;
    protected _JSONSerializer: Serializer<
        unknown // TODO: DTOForEntityCommonFields<EntityType>
    > = new JSONSerializerImpl();
    public save(
        storageKey: string,
        dtoObj: any // TODO: RecordStringifiableJSONString,
    ): void {
        this._storageImpl.setItem(storageKey, this._JSONSerializer.toString(dtoObj))
    }
    
    public load(
        storageKey: string,
    ): DTOForEntityCommonFields<EntityType> | null {
        const value = this._storageImpl.getItem(storageKey)
        if (!value) {
            return null
        }
        return this._JSONSerializer.parse(value) as any;
    }
    
    public remove(
        storageKey: string,
    ): void {
        this._storageImpl.removeItem(storageKey)
    }
}