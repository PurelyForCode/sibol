import express, { json, urlencoded } from 'express'
import { sellerRouter } from './routers/SellerRouter.js'
import { productRouter } from './routers/ProductRouter.js'
import { buyerRouter } from './routers/BuyerRouter.js'
import { authenticationRouter } from './routers/AuthenticationRouter.js'
import { cartRouter } from './routers/CartRouter.js'
import { reservationRouter } from './routers/ReservationRouter.js'

export const apiRouter = express()

apiRouter.use(json())
apiRouter.use(urlencoded())

apiRouter.use('/products', productRouter)
apiRouter.use('/accounts/sellers', sellerRouter)
apiRouter.use('/accounts/buyers', buyerRouter)
apiRouter.use('/', authenticationRouter)
apiRouter.use('/cart', cartRouter)
apiRouter.use('/reservations', reservationRouter)
