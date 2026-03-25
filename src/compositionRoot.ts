import { BuyerController } from './controllers/BuyerController.js'
import { RegisterBuyerUsecase } from './features/accounts/RegisterBuyerUsecase.js'
import { knexInstance } from './infra/config/KnexInstance.js'
import { KnexTransactionManager } from './infra/implementations/KnexTransactionManager.js'
import { Uuidv7Generator } from './infra/implementations/Uuidv7Generator.js'
import { ArgonPasswordUtil } from './infra/implementations/ArgonPasswordUtil.js'
import { SellerController } from './controllers/SellerController.js'
import { RegisterSellerUsecase } from './features/accounts/RegisterSellerUsecase.js'
import { AuthenticationController } from './controllers/AuthenticationController.js'
import { LoginSellerUsecase } from './features/authentication/LoginSeller.js'
import { LoginBuyerUsecase } from './features/authentication/LoginBuyer.js'
import { ProductController } from './controllers/ProductController.js'
import { CreateProductUsecase } from './features/shopping/products/CreateProductUsecase.js'
import { ArchiveProductBySellerUsecase } from './features/shopping/products/ArchiveProductBySellerUsecase.js'
import { PgProductQueryRepository } from './infra/db/query_repositories/PgProductQueryRepository.js'
import { AddSellUnitUsecase } from './features/shopping/products/AddSellUnitUsecase.js'
import { DiscontinueSellUnitUsecase } from './features/shopping/products/DiscontinueSellUnitUsecase.js'
import { PgProductSellUnitQueryRepository } from './infra/db/query_repositories/PgProductSellUnitQueryRepository.js'
import { CartController } from './controllers/CartController.js'
import { AddToCartUsecase } from './features/shopping/cart/AddToCartUsecase.js'
import { RemoveFromCartUsecase } from './features/shopping/cart/RemoveFromCartUsecase.js'
import { ReserveItemsForPickupUsecase } from './features/shopping/cart/ReserveItemsForPickupUsecase.js'
import { UpdateProductUsecase } from './features/shopping/products/UpdateProductUsecase.js'
import { PgCartQueryRepository } from './infra/db/query_repositories/PgCartQueryRepository.js'
import { PgReservationQueryRepository } from './infra/db/query_repositories/PgReservationQueryRepository.js'
import { ReservationController } from './controllers/ReservationController.js'
import { FulfillReservationUsecase } from './features/reservation/FulfillReservation.js'
import { ConfirmReservationUsecase } from './features/reservation/ConfirmReservation.js'
import { PgSaleQueryRepository } from './infra/db/query_repositories/PgSaleQueryRepository.js'
import { AddImagesUsecase } from './features/shopping/products/AddImageUsecase.js'
import { RemoveImageUsecase } from './features/shopping/products/RemoveImageUsecase.js'
import { MakeThumbnailUsecase } from './features/shopping/products/MakeThumbnailUsecase.js'
import { FileSystemImageStorage } from './infra/implementations/FileSystemImageStorage.js'
import path from 'path'
import { ReviewController } from './controllers/ReviewController.js'
import { ReviewProductUsecase } from './features/shopping/reviews/ReviewProductUsecase.js'
import { DeleteReviewUsecase } from './features/shopping/reviews/DeleteReviewUsecase.js'

export const imageStorageLocation = `${process.env.DOMAIN_NAME}/images`

// Singletons
export const idGenerator = new Uuidv7Generator()
export const passwordUtility = new ArgonPasswordUtil()
export const transactionManager = new KnexTransactionManager(
    knexInstance,
    idGenerator,
)
export const imageStorage = new FileSystemImageStorage(
    path.resolve(process.cwd(), 'public/images'),
)

// Usecases

// Registration
export const registerBuyerUsecase = new RegisterBuyerUsecase(
    transactionManager,
    idGenerator,
    passwordUtility,
)
export const registerSellerUsecase = new RegisterSellerUsecase(
    transactionManager,
    idGenerator,
    passwordUtility,
)

// Login
export const loginSellerUsecase = new LoginSellerUsecase(
    transactionManager,
    passwordUtility,
)
export const loginBuyerUsecase = new LoginBuyerUsecase(
    transactionManager,
    passwordUtility,
)

// Product
export const createProductUsecase = new CreateProductUsecase(
    transactionManager,
    idGenerator,
)
export const archiveProductBySellerUsecase = new ArchiveProductBySellerUsecase(
    transactionManager,
)
export const updateProductUsecase = new UpdateProductUsecase(
    transactionManager,
    idGenerator,
)
export const addSellUnitUsecase = new AddSellUnitUsecase(
    transactionManager,
    idGenerator,
)
export const discontinueSellUnitUsecase = new DiscontinueSellUnitUsecase(
    transactionManager,
)
export const addImagesUsecase = new AddImagesUsecase(
    transactionManager,
    idGenerator,
)
export const removeImageUsecase = new RemoveImageUsecase(
    transactionManager,
    imageStorage,
)
export const makeThumbnailUsecase = new MakeThumbnailUsecase(transactionManager)
// Cart
export const reserveItemsForPickupUsecase = new ReserveItemsForPickupUsecase(
    transactionManager,
    idGenerator,
)
export const addToCartUsecase = new AddToCartUsecase(
    transactionManager,
    idGenerator,
)
export const removeFromCartUsecase = new RemoveFromCartUsecase(
    transactionManager,
)

// Reservations
export const fulfillReservationUsecase = new FulfillReservationUsecase(
    transactionManager,
)
export const confirmReservationUsecase = new ConfirmReservationUsecase(
    transactionManager,
    idGenerator,
)
// Reviews
export const reviewProductUsecase = new ReviewProductUsecase(
    transactionManager,
    idGenerator,
)
export const deleteReviewUsecase = new DeleteReviewUsecase(
    transactionManager,
    imageStorage,
)

// Controllers
export const buyerController = new BuyerController(registerBuyerUsecase)
export const sellerController = new SellerController(registerSellerUsecase)
export const productController = new ProductController(
    createProductUsecase,
    archiveProductBySellerUsecase,
    addSellUnitUsecase,
    discontinueSellUnitUsecase,
    updateProductUsecase,
    addImagesUsecase,
    removeImageUsecase,
    makeThumbnailUsecase,
)
export const authenticationController = new AuthenticationController(
    loginSellerUsecase,
    loginBuyerUsecase,
    null,
)
export const cartController = new CartController(
    addToCartUsecase,
    removeFromCartUsecase,
    reserveItemsForPickupUsecase,
)
export const reservationController = new ReservationController(
    fulfillReservationUsecase,
    confirmReservationUsecase,
)
export const reviewController = new ReviewController(
    reviewProductUsecase,
    deleteReviewUsecase,
)

// Query Repositories
export const productQueryRepository = new PgProductQueryRepository(knexInstance)
export const productSellUnitQueryRepository =
    new PgProductSellUnitQueryRepository(knexInstance)
export const cartQueryRepository = new PgCartQueryRepository(knexInstance)
export const reservationQueryRepository = new PgReservationQueryRepository(
    knexInstance,
)
export const saleQueryRepository = new PgSaleQueryRepository(knexInstance)
