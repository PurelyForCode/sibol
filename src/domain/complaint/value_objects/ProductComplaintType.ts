import { SingleValueObject } from '../../shared/SingleValueObject.js'

export enum ProductComplaintTypeEnum {
    Unfulfilled = 'unfulfilled',
    Poor_Quality = 'poor_quality',
    Incomplete_Quantity = 'incomplete_quantity',
    Other = 'other',
}

export class ProductComplaintType extends SingleValueObject<ProductComplaintTypeEnum> {
    private constructor(value: ProductComplaintTypeEnum) {
        super(value)
    }

    static create(value: ProductComplaintTypeEnum) {
        return new ProductComplaintType(value)
    }
}
