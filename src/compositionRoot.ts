import { PgSellerRepositoryFactory } from './features/account/infrastructure/repositories/PgSellerRepository.js'
import { ProductController } from './features/product/adapters/controllers/ProductController.js'
import { CreateProductUsecase } from './features/product/application/product/usecases/CreateProductUsecase.js'
import { DeleteProductBySellerUsecase } from './features/product/application/product/usecases/DeleteProductBySellerUsecase.js'
import { ProductService } from './features/product/domain/services/ProductService.js'
import { PgProductRepositoryFactory } from './features/product/infrastructure/repositories/PostgresqlProductRepository.js'
import { KnexTransactionManager } from './lib/implementations/KnexTransactionManager.js'
import { Uuidv7Generator } from './lib/implementations/Uuidv7Generator.js'
import { knexInstance } from './config/KnexInstance.js'
import { PostgresqlProductQueryRepository } from './features/product/infrastructure/repositories/PostgresqlProductQueryRepository.js'

export const transactionManager = new KnexTransactionManager(knexInstance)
// Interfaces
export const idGenerator = new Uuidv7Generator()

// Repositories
export const productRepositoryFactory = new PgProductRepositoryFactory()
export const productQueryRepository = new PostgresqlProductQueryRepository(
    knexInstance,
)

export const accountRepositoryFactory = new PgSellerRepositoryFactory()

// Domain
export const productService = new ProductService()

// Application
export const deleteProductBySellerUsecase = new DeleteProductBySellerUsecase(
    transactionManager,
    productRepositoryFactory,
    accountRepositoryFactory,
    productService,
)

export const createProductUsecase = new CreateProductUsecase(
    transactionManager,
    productRepositoryFactory,
    accountRepositoryFactory,
    productService,
    idGenerator,
)

// Adapters
export const productController = new ProductController(
    createProductUsecase,
    deleteProductBySellerUsecase,
)
