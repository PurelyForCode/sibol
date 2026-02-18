export enum CartStatus {}

export class Cart {
    private constructor(
        private _id: string,
        private _status: CartStatus,
        private _shippingAddress: string,
        private _subtotal: number,
        private _discountTotal: number,
        private _taxTotal: number,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    getGrandTotal(): number {
        return this.subtotal + this.taxTotal - this.discountTotal
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get taxTotal(): number {
        return this._taxTotal
    }
    public get discountTotal(): number {
        return this._discountTotal
    }
    public get subtotal(): number {
        return this._subtotal
    }
    public get shippingAddress(): string {
        return this._shippingAddress
    }
    public get status(): CartStatus {
        return this._status
    }
    public get id(): string {
        return this._id
    }
}
