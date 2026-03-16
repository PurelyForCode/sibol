import { SingleValueObject } from '../../shared/SingleValueObject.js'

export enum SellerComplaintTypeEnum {
    Unfulfilled = 'unfulfilled',
    Poor_Quality = 'poor_quality',
    Incomplete_Quantity = 'incomplete_quantity',
    Other = 'other',
}

export class SellerComplaintType extends SingleValueObject<SellerComplaintTypeEnum> {
    private constructor(value: SellerComplaintTypeEnum) {
        super(value)
    }

    static create(value: SellerComplaintTypeEnum) {
        return new SellerComplaintType(value)
    }
}
