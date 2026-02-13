import { SellerController } from './controllers/SellerController.js'
import { KnexTransactionManager } from './core/infrastructure/KnexTransactionManager.js'
import { SellerService } from './services/SellerService.js'
import { knexInstance } from './config/KnexInstance.js'
import { Uuidv7Generator } from './core/infrastructure/UuidIdGenerator.js'
import { AppExceptionToHttpExceptionMapper } from './exceptions/AppExceptionToHttpExceptionMapper.js'
import { SellerAlreadyExistsException } from './exceptions/seller/SellerAlreadyExistsException.js'
import { SellerNotFoundException } from './exceptions/seller/SellerNotFoundException.js'

// global
export const transactionManager = new KnexTransactionManager(knexInstance)
export const idGenerator = new Uuidv7Generator()

// services
export const sellerService = new SellerService(transactionManager, idGenerator)

// controllers
export const sellerController = new SellerController(sellerService)

// exception mapping
export const applicationExceptionMapper =
    new AppExceptionToHttpExceptionMapper()

applicationExceptionMapper.register(SellerAlreadyExistsException.code, 409)
applicationExceptionMapper.register(SellerNotFoundException.code, 404)
