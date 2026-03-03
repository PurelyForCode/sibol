import express, { json, urlencoded, Router } from 'express'
import { buyerProductRouter } from './routers/buyer/BuyerProductRouter.js'
import { authenticationRouter } from './routers/AuthenticationRouter.js'
import { buyerCartRouter } from './routers/buyer/BuyerCartRouter.js'
import { sellerReservationRouter } from './routers/seller/SellerReservationRouter.js'
import { registrationRouter } from './routers/RegistrationRouter.js'
import { buyerReservationRouter } from './routers/buyer/BuyerReservationRouter.js'
import { sellerProductRouter } from './routers/seller/SellerProductRouter.js'
import { sellerSaleRouter } from './routers/seller/SellerSaleRouter.js'

export const apiRouter = express()

apiRouter.use(json())
apiRouter.use(urlencoded())

// global routes
apiRouter.use('/', authenticationRouter)
apiRouter.use('/accounts', registrationRouter)

// buyer routes
export const buyerApiRouter = Router({ mergeParams: true })
buyerApiRouter.use('/products', buyerProductRouter)
buyerApiRouter.use('/cart', buyerCartRouter)
buyerApiRouter.use('/reservations', buyerReservationRouter)

// seller routes
export const sellerApiRouter = Router({ mergeParams: true })
sellerApiRouter.use('/products', sellerProductRouter)
sellerApiRouter.use('/reservations', sellerReservationRouter)
sellerApiRouter.use('/sales', sellerSaleRouter)

apiRouter.use('/buyers', buyerApiRouter)
apiRouter.use('/sellers', sellerApiRouter)
