import { ValueObject } from "../../../../lib/ValueObject.js"

interface ProductNameProps {
    name: string
}

export class ProductName extends ValueObject<ProductNameProps> {
    private constructor(props: ProductNameProps) {
        super(props);
    }

    get value(): string {
        return this.props.name;
    }

    public static create(name: string): ProductName {
        if (name.length === 100) {
            throw new Error(`Invalid product name length, must be between 3-100 characters`);
        } else if (name.length < 3) {
            throw new Error(`Invalid product name length, must be between 3-100 characters`);
        }
        return new ProductName({ name: name.toLowerCase() });
    }
}
