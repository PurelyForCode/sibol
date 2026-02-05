import { PostgresqlAccountRepository } from "./features/account/infrastructure/repositories/AccountRepository.js";
import { ProductController } from "./features/product/adapters/controllers/ProductController.js";
import { CreateProductUsecase } from "./features/product/application/product/CreateProductUseCase.js";
import { ProductService } from "./features/product/domain/services/ProductService.js";
import { Uuidv7Generator } from "./lib/implementations/Uuidv7Generator.js";
import { PostgresqlProductRepository } from "./ProductRepository.js";

// Interfaces
export const idGenerator = new Uuidv7Generator()


// Repositories
export const productRepository = new PostgresqlProductRepository()
export const accountRepository = new PostgresqlAccountRepository()


// Domain
export const productService = new ProductService()

// Application
export const createProductUsecase = new CreateProductUsecase(
    productRepository,
    accountRepository,
    productService,
    idGenerator
)
// Adapters
export const productController = new ProductController(createProductUsecase)
