import { SingleValueObject } from '../../shared/SingleValueObject.js'

export enum ProductComplaintStatusEnum {
    Verified = 'verified',
    Dismissed = 'dismissed',
    Concluded = 'concluded',
    In_Review = 'in_review',
}

export class ProductComplaintStatus extends SingleValueObject<ProductComplaintStatusEnum> {
    private constructor(value: ProductComplaintStatusEnum) {
        super(value)
    }

    static create(value: ProductComplaintStatusEnum) {
        return new ProductComplaintStatus(value)
    }
}
