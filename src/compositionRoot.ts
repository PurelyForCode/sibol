import { id } from 'zod/locales'
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
import { ProductController } from './features/shopping/ProductController.js'
import { CreateProductUsecase } from './features/shopping/create_product/CreateProductUsecase.js'
import { DeleteProductBySellerUsecase } from './features/shopping/delete_product/DeleteProductBySellerUsecase.js'

export const idGenerator = new Uuidv7Generator()
export const passwordUtility = new ArgonPasswordUtil()

export const transactionManager = new KnexTransactionManager(
    knexInstance,
    idGenerator,
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
export const deleteProductBySellerUsecase = new DeleteProductBySellerUsecase(
    transactionManager,
)

export const buyerController = new BuyerController(registerBuyerUsecase)
export const sellerController = new SellerController(registerSellerUsecase)

export const productController = new ProductController(
    createProductUsecase,
    deleteProductBySellerUsecase,
)
export const authenticationController = new AuthenticationController(
    loginSellerUsecase,
    loginBuyerUsecase,
    null,
)
