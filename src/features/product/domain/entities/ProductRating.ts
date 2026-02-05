import { ValueObject } from "../../../../lib/ValueObject.js";

interface ProductRatingProps {
    rating: number
}
export class ProductRating extends ValueObject<ProductRatingProps> {
    private constructor(props: ProductRatingProps) {
        super(props)
    }

    static create(rating: number) {
        if (rating > 5 && rating < 0) {
            throw new Error("Product rating can only be between 0-5")
        }
        return new ProductRating({ rating: rating })
    }
}
