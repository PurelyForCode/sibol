import { BuyerController } from './features/buyer/BuyerController.js'
import { RegisterBuyerUsecase } from './features/buyer/register_buyer/RegisterBuyerUsecase.js'
import { knexInstance } from './infra/config/KnexInstance.js'
import { KnexTransactionManager } from './infra/implementations/KnexTransactionManager.js'
import { Uuidv7Generator } from './infra/implementations/Uuidv7Generator.js'
import { ArgonPasswordUtil } from './infra/implementations/ArgonPasswordUtil.js'
import { SellerController } from './features/seller/SellerController.js'
import { RegisterSellerUsecase } from './features/seller/register_seller/RegisterSellerUsecase.js'
import { AuthenticationController } from './features/authentication/AuthenticationController.js'
import { LoginSellerUsecase } from './features/authentication/login/LoginSeller.js'
import { LoginBuyerUsecase } from './features/authentication/login/LoginBuyer.js'
import { ProductController } from './features/products/ProductController.js'
import { CreateProductUsecase } from './features/products/create_product/CreateProductUsecase.js'
import { ArchiveProductBySellerUsecase } from './features/products/archive_product/ArchiveProductBySellerUsecase.js'
import { PgProductQueryRepository } from './infra/db/query_repositories/PgProductQueryRepository.js'
import { AddSellUnitUsecase } from './features/products/add_sell_unit/AddSellUnitUsecase.js'
import { DiscontinueSellUnitUsecase } from './features/products/discontinue_sell_unit/DiscontinueSellUnitUsecase.js'
import { PgProductSellUnitQueryRepository } from './infra/db/query_repositories/PgProductSellUnitQueryRepository.js'
import { CartController } from './features/shopping/CartController.js'
import { AddToCartUsecase } from './features/shopping/add_to_cart/AddToCartUsecase.js'
import { RemoveFromCartUsecase } from './features/shopping/remove_from_cart/RemoveFromCartUsecase.js'
import { ReserveItemsForPickupUsecase } from './features/shopping/reserve_items_for_pickup/ReserveItemsForPickupUsecase.js'
import { UpdateProductUsecase } from './features/products/update_product/UpdateProductUsecase.js'

export const idGenerator = new Uuidv7Generator()
export const passwordUtility = new ArgonPasswordUtil()

export const transactionManager = new KnexTransactionManager(
    knexInstance,
    idGenerator,
)
export const addToCartUsecase = new AddToCartUsecase(
    transactionManager,
    idGenerator,
)
export const removeFromCartUsecase = new RemoveFromCartUsecase(
    transactionManager,
)
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
export const loginSellerUsecase = new LoginSellerUsecase(
    transactionManager,
    passwordUtility,
)
export const loginBuyerUsecase = new LoginBuyerUsecase(
    transactionManager,
    passwordUtility,
)
export const createProductUsecase = new CreateProductUsecase(
    transactionManager,
    idGenerator,
)
export const archiveProductBySellerUsecase = new ArchiveProductBySellerUsecase(
    transactionManager,
)
export const addSellUnitUsecase = new AddSellUnitUsecase(
    transactionManager,
    idGenerator,
)

export const discontinueSellUnitUsecase = new DiscontinueSellUnitUsecase(
    transactionManager,
)
export const updateProductUsecase = new UpdateProductUsecase(
    transactionManager,
    idGenerator,
)
export const reserveItemsForPickupUsecase = new ReserveItemsForPickupUsecase(
    transactionManager,
    idGenerator,
)

export const buyerController = new BuyerController(registerBuyerUsecase)
export const sellerController = new SellerController(registerSellerUsecase)

export const productController = new ProductController(
    createProductUsecase,
    archiveProductBySellerUsecase,
    addSellUnitUsecase,
    discontinueSellUnitUsecase,
    updateProductUsecase,
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

export const productQueryRepository = new PgProductQueryRepository(knexInstance)
export const productSellUnitQueryRepository =
    new PgProductSellUnitQueryRepository(knexInstance)
