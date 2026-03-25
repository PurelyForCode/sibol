import { EntityId } from '../EntityId.js'

export class Address {
    private constructor(
        readonly id: EntityId,
        readonly regionId: string,
        readonly provinceId: string,
        readonly minicipalityCityId: string,
        readonly barangayId: string,
        readonly addressLine1: string,
        readonly addressLine2: string | null,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ) {}
    static create(
        id: EntityId,
        regionId: string,
        provinceId: string,
        minicipalityCityId: string,
        barangayId: string,
        addressLine1: string,
        addressLine2: string | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Address(
            id,
            regionId,
            provinceId,
            minicipalityCityId,
            barangayId,
            addressLine1,
            addressLine2,
            createdAt,
            updatedAt,
        )
    }
}
