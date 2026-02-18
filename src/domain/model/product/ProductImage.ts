export class ProductImage {
    private constructor(
        private _id: string,
        private _productId: string,
        private _index: number,
        private _url: string,
    ) {}

    static rehydrate(
        id: string,
        productId: string,
        index: number,
        url: string,
    ) {
        return new ProductImage(id, productId, index, url)
    }

    static new(id: string, productId: string, index: number, url: string) {
        return new ProductImage(id, productId, index, url)
    }

    public get url(): string {
        return this._url
    }
    public get index(): number {
        return this._index
    }
    public get productId(): string {
        return this._productId
    }
    public get id(): string {
        return this._id
    }
}
