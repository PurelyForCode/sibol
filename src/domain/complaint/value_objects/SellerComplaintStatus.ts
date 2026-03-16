import { SingleValueObject } from '../../shared/SingleValueObject.js'

export enum SellerComplaintStatusEnum {
    Verified = 'verified',
    Dismissed = 'dismissed',
    Concluded = 'concluded',
    In_Review = 'in_review',
}

export class SellerComplaintStatus extends SingleValueObject<SellerComplaintStatusEnum> {
    private constructor(value: SellerComplaintStatusEnum) {
        super(value)
    }

    static create(value: SellerComplaintStatusEnum) {
        return new SellerComplaintStatus(value)
    }
}
