import { type DTOForEntityCommonFields } from "@react-node-monorepo/application";
import { type EntityType } from "@react-node-monorepo/domain";

export interface DTOStorage {
    save(
        storageKey: string,
        dtoObj: any // TODO: RecordStringifiableJSONString,
    ): void;

    load(storageKey: string): DTOForEntityCommonFields<EntityType> | null;

    remove(storageKey: string): void
}