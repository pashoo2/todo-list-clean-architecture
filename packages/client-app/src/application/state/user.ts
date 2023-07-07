import { AdminEntity, CustomerEntity, EntityType } from "@react-node-monorepo/domain";
import { makeAutoObservable } from 'mobx';
import { AppUserRole } from "../enum";
import { 
    DTOAdminEntityToEntityImpl,
    DTOCustomerEntity,
    DTOCustomerEntityFromEntityImpl,
    DTOCustomerEntityToEntityImpl,
    DTOForEntityCommonFields,
    DTOAdminEntityFromEntityImpl,
    DTOAdminEntity
} from "@react-node-monorepo/application";
import { type DTOStorage, DTOStorageImpl } from "../../services";

export class AppStateUser {
    static readonly storageKeyPrefix = '__AppStateUser'
    static readonly storageKeyUser = 'user_dto'
    public get userRole(): AppUserRole {
        const userOrNull = this.userOrNull

        if (userOrNull?.type === EntityType.Customer) {
            return AppUserRole.CUSTOMER
        }
        if (userOrNull?.type === EntityType.Admin) {
            return AppUserRole.ADMIN
        }
        return AppUserRole.NONE
    }
    public userOrNull: AdminEntity | CustomerEntity | null = null
    // TODO: use DI injection
    protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();
    protected _dtoCustomerEntityFromEntityImpl = new DTOCustomerEntityFromEntityImpl();
    
    protected _dtoAdminEntityToEntityImpl = new DTOAdminEntityToEntityImpl();
    protected _dtoAdminEntityFromEntityImpl = new DTOAdminEntityFromEntityImpl();
    protected _dtoStorage: DTOStorage = new DTOStorageImpl()

    protected get _storageKeyUser(): string {
        return this._getStorageKeyName(AppStateUser.storageKeyUser)
    } 
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true, deep: true });
        // TODO: load current user from server
        this._loadUserFromStorage();
    }

    public setCurrentUser(
        user: AdminEntity | CustomerEntity
    ): void {
        this.unsetCurrentUser();
        this.userOrNull = user;
        this._saveUserToStorage();
    }

    public unsetCurrentUser() {
        this.userOrNull = null
        // this._removeDTOFromStorage(this._storageKeyUser);
    }

    protected _saveUserToStorage(): void {
        const userEntityOrNull = this.userOrNull;
        let userDTOOrNull: DTOCustomerEntity | DTOAdminEntity | null = null
        
        if (!userEntityOrNull) {
            return;
        }
        if (userEntityOrNull.type === EntityType.Customer) {
            userDTOOrNull = this._dtoCustomerEntityFromEntityImpl.derive(userEntityOrNull)
        }
        if (userEntityOrNull?.type === EntityType.Admin) {
            userDTOOrNull = this._dtoAdminEntityFromEntityImpl.derive(userEntityOrNull)
        }
        if (!userDTOOrNull) {
            return;
        }
        this._saveDTOToStorage(
            this._storageKeyUser,
            userDTOOrNull
        )
    }

    // TODO: add session storage service
    protected _loadUserFromStorage(): void {
        const userDTOOrNull = this._loadDTOFromStorage(this._storageKeyUser);
        if (!userDTOOrNull) {
            this.unsetCurrentUser()
            return;
        }
        if (userDTOOrNull.type === EntityType.Customer) {
            this.userOrNull = this._dtoCustomerEntityToEntityImpl.derive(userDTOOrNull as DTOCustomerEntity)
        }
        if (userDTOOrNull.type === EntityType.Admin) {
            this.userOrNull = this._dtoAdminEntityToEntityImpl.derive(userDTOOrNull as DTOAdminEntity)
        }
    }

    protected _getStorageKeyName(storageKey: string): string {
        return `${AppStateUser.storageKeyPrefix}/${storageKey}`
    }

    protected _saveDTOToStorage(
        storageKey: string,
        dtoObj: any // TODO: RecordStringifiableJSONString,
    ): void {
        this._dtoStorage.save(storageKey, dtoObj)
    }

    protected _loadDTOFromStorage(
        storageKey: string,
    ): DTOForEntityCommonFields<EntityType> | null {
        return this._dtoStorage.load(storageKey)
    }

    protected _removeDTOFromStorage(
        storageKey: string,
    ): void {
        this._dtoStorage.remove(storageKey)
    }
}
