import { ValueObject } from "../../../../../lib/ValueObject.js";

interface ProductDescriptionProps {
    description: string
}

export class ProductDescription extends ValueObject<ProductDescriptionProps> {
    private constructor(props: ProductDescriptionProps) {
        super(props);
    }

    get value(): string {
        return this.props.description;
    }

    public static create(description: string): ProductDescription {
        return new ProductDescription({ description: description.toLowerCase() });
    }
}
