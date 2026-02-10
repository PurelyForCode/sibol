import { PgSellerRepositoryFactory } from './features/account/infrastructure/repositories/PgSellerRepository.js'
import { ProductController } from './features/product/adapters/controllers/ProductController.js'
import { CreateProductUsecase } from './features/product/application/product/usecases/CreateProductUsecase.js'
import { DeleteProductBySellerUsecase } from './features/product/application/product/usecases/DeleteProductBySellerUsecase.js'
import { ProductService } from './features/product/domain/services/ProductService.js'
import { PgProductRepositoryFactory } from './features/product/infrastructure/repositories/PgProductRepository.js'
import { KnexTransactionManager } from './lib/implementations/KnexTransactionManager.js'
import { Uuidv7Generator } from './lib/implementations/Uuidv7Generator.js'
import { knexInstance } from './config/KnexInstance.js'
import { PgProductQueryRepository } from './features/product/infrastructure/repositories/PgProductQueryRepository.js'
import { SellerService } from './features/account/domain/services/SellerService.js'
import { RegisterSellerUsecase } from './features/account/application/RegisterSellerUsecase.js'
import { ArgonPasswordHasher } from './lib/implementations/ArgonPasswordHasher.js'
import { SellerController } from './features/account/adapter/SellerController.js'
import { PgSellerQueryRepository } from './features/account/infrastructure/repositories/PgSellerQueryRepository.js'

export const transactionManager = new KnexTransactionManager(knexInstance)
export const passwordHasher = new ArgonPasswordHasher()
// Interfaces
export const idGenerator = new Uuidv7Generator()

// Repositories
export const productRepositoryFactory = new PgProductRepositoryFactory()
export const productQueryRepository = new PgProductQueryRepository(knexInstance)
export const sellerRepositoryFactory = new PgSellerRepositoryFactory()
export const sellerQueryRepository = new PgSellerQueryRepository(knexInstance)

// Domain
export const productService = new ProductService()
export const sellerService = new SellerService()

// Application
// Product
export const deleteProductBySellerUsecase = new DeleteProductBySellerUsecase(
    transactionManager,
    productRepositoryFactory,
    sellerRepositoryFactory,
    productService,
)
export const createProductUsecase = new CreateProductUsecase(
    transactionManager,
    productRepositoryFactory,
    sellerRepositoryFactory,
    productService,
    idGenerator,
)

// Seller
export const registerSellerUsecase = new RegisterSellerUsecase(
    transactionManager,
    sellerRepositoryFactory,
    sellerService,
    idGenerator,
    passwordHasher,
)

// Adapters
export const productController = new ProductController(
    createProductUsecase,
    deleteProductBySellerUsecase,
)

export const sellerController = new SellerController(registerSellerUsecase)
