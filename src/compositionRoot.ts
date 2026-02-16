import { KnexTransactionManager } from './core/infrastructure/KnexTransactionManager.js'
import { SellerService } from './services/SellerService.js'
import { knexInstance } from './config/KnexInstance.js'
import { Uuidv7Generator } from './core/infrastructure/UuidIdGenerator.js'
import { AppExceptionToHttpExceptionMapper } from './exceptions/AppExceptionToHttpExceptionMapper.js'
import { SellerAlreadyExistsException } from './exceptions/seller/SellerAlreadyExistsException.js'
import { SellerNotFoundException } from './exceptions/seller/SellerNotFoundException.js'
import { StoreNameAlreadyExistsException } from './exceptions/seller/StoreNameAlreadyExistsException.js'
import { StoreSlugAlreadyExistsException } from './exceptions/seller/StoreSlugAlreadyExistsException.js'
import { FakeEmailService } from './core/infrastructure/FakeEmailService.js'
import { email } from 'zod/mini'
import { ArgonPasswordHasher } from './core/infrastructure/ArgonPasswordHasher.js'
import { BuyerAlreadyExistsException } from './exceptions/buyer/BuyerAlreadyExistsException.js'
import { BuyerNotFoundException } from './exceptions/buyer/BuyerNotFoundException.js'
import { BuyerUsernameAlreadyExistsException } from './exceptions/buyer/BuyerUsernameAlreadyExistsException.js'
import { VerificationService } from './domain/services/VerificationService.js'
import { RegisterSellerUsecase } from './application/usecases/sellers/RegisterSellerUsecase.js'
import { RegisterBuyerUsecase } from './application/usecases/buyers/RegisterBuyerUsecase.js'
import { SellerController } from './application/controllers/SellerController.js'
import { BuyerController } from './application/controllers/BuyerController.js'
import { VerifyBuyerUsecase } from './application/usecases/buyers/VerifyBuyerUsecase.js'
import { VerifySellerUsecase } from './application/usecases/sellers/VerifySellerUsecase.js'
import { LocalImageStorage } from './core/infrastructure/LocalImageStorage.js'
import { ProductController } from './application/controllers/ProductController.js'
import { CreateProductUsecase } from './application/usecases/products/CreateProductUsecase.js'
import { ArchiveProductUsecase } from './application/usecases/products/ArchiveProductUsecase.js'
import { UpdateProductUsecase } from './application/usecases/products/UpdateProductUsecase.js'

// global
export const transactionManager = new KnexTransactionManager(knexInstance)
export const idGenerator = new Uuidv7Generator()
export const emailService = new FakeEmailService()
export const passwordHasher = new ArgonPasswordHasher()
export const verificationService = new VerificationService(emailService)
export const imageStorage = new LocalImageStorage()

// usecases
// sellers
export const registerSeller = new RegisterSellerUsecase(
    transactionManager,
    idGenerator,
    passwordHasher,
    verificationService,
)
export const verifySeller = new VerifySellerUsecase(
    transactionManager,
    verificationService,
)
// buyers
export const registerBuyer = new RegisterBuyerUsecase(
    transactionManager,
    idGenerator,
    passwordHasher,
    verificationService,
)
export const verifyBuyer = new VerifyBuyerUsecase(
    transactionManager,
    verificationService,
)

// products
export const createProduct = new CreateProductUsecase(
    transactionManager,
    idGenerator,
)
export const archiveProduct = new ArchiveProductUsecase(transactionManager)
export const updateProduct = new UpdateProductUsecase(transactionManager)

// controllers
export const sellerController = new SellerController(
    registerSeller,
    verifySeller,
)
export const buyerController = new BuyerController(registerBuyer, verifyBuyer)
export const productController = new ProductController(
    createProduct,
    archiveProduct,
    updateProduct,
)

// exception mapping
export const applicationExceptionMapper =
    new AppExceptionToHttpExceptionMapper()

// seller exceptions
applicationExceptionMapper.register(SellerAlreadyExistsException.code, 409)
applicationExceptionMapper.register(SellerNotFoundException.code, 404)
applicationExceptionMapper.register(StoreNameAlreadyExistsException.code, 409)
applicationExceptionMapper.register(StoreSlugAlreadyExistsException.code, 409)

// buyer exceptions
applicationExceptionMapper.register(BuyerAlreadyExistsException.code, 409)
applicationExceptionMapper.register(BuyerNotFoundException.code, 404)
applicationExceptionMapper.register(
    BuyerUsernameAlreadyExistsException.code,
    409,
)
