import { AggregateRoot } from '../../shared/AggregateRoot'
import { EntityId } from '../../shared/EntityId'
import { Email } from '../../shared/value_objects/Email'
import { MobilePhoneNumber } from '../../shared/value_objects/MobilePhoneNumber'
import { StoreName } from './StoreName'
import { TotalSales } from '../../shared/value_objects/TotalSales'
import { StoreDescription } from './StoreDescription'
import { Address } from '../../shared/value_objects/Address'

export class Store extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _address: Address,
        private _name: StoreName,
        private _description: StoreDescription | null,
        private _supportEmail: Email | null,
        private _supportPhone: MobilePhoneNumber | null,
        private _totalSales: TotalSales,
    ) {
        super(id)
    }

    changeAddress(newAddress: Address): void {
        this._address = newAddress
    }

    changeName(newName: StoreName): void {
        if (this._name.equals(newName)) return
        this._name = newName
    }

    changeDescription(newDescription: StoreDescription | null): void {
        this._description = newDescription
    }

    changeSupportEmail(newEmail: Email | null): void {
        this._supportEmail = newEmail
    }

    changeSupportPhone(newPhone: MobilePhoneNumber | null): void {
        this._supportPhone = newPhone
    }

    static rehydrate(
        id: EntityId,
        address: Address,
        name: StoreName,
        description: StoreDescription,
        supportEmail: Email | null,
        supportPhone: MobilePhoneNumber | null,
        totalSales: TotalSales,
    ) {
        return new Store(
            id,
            address,
            name,
            description,
            supportEmail,
            supportPhone,
            totalSales,
        )
    }

    static new(
        id: EntityId,
        address: Address,
        name: StoreName,
        description: StoreDescription | null,
        supportEmail: Email | null,
        supportPhone: MobilePhoneNumber | null,
    ) {
        return new Store(
            id,
            address,
            name,
            description,
            supportEmail,
            supportPhone,
            TotalSales.zero(),
        )
    }

    public get totalSales(): TotalSales {
        return this._totalSales
    }
    public get supportPhone(): MobilePhoneNumber | null {
        return this._supportPhone
    }
    public get supportEmail(): Email | null {
        return this._supportEmail
    }
    public get description(): StoreDescription | null {
        return this._description
    }
    public get name(): StoreName {
        return this._name
    }
    public get address(): Address {
        return this._address
    }
}
