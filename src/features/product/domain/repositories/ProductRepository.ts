import { EntityId } from "../../../../lib/EntityId.js";
import { Repository } from "../../../../lib/interfaces/Repository.js";
import { Product } from "../entities/Product.js";

export interface ProductRepository extends Repository<Product, EntityId> { }
