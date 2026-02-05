import { EntityId } from "../../../../lib/EntityId.js";
import { Product } from "../../domain/entities/Product.js";
import { ProductRepository } from "../../domain/repositories/ProductRepository.js";

export class PostgresqlProductRepository implements ProductRepository {

    findById(id: EntityId): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    existsById(id: EntityId): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    create(T: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: EntityId): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(T: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
