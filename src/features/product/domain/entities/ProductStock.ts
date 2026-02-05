import { ValueObject } from "../../../../lib/ValueObject.js";

export interface ProductStockProps {
    stock: number
}

export class ProductStock extends ValueObject<ProductStockProps> {
    private constructor(props: ProductStockProps) {
        super(props)
    }

    static create(stock: number) {
        if (stock < 0) {
            throw new Error("Product stock can not reach negative")
        }
        return new ProductStock({ stock })
    }
}
