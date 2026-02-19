import express, { json, urlencoded } from 'express'
import { sellerRouter } from './routers/SellerRouter.js'
import { productRouter } from './routers/ProductRouter.js'
import { buyerRouter } from './routers/BuyerRouter.js'
import { authenticationRouter } from './routers/AuthenticationRouter.js'

export const apiRouter = express()

apiRouter.use(json())
apiRouter.use(urlencoded())

apiRouter.get('/', (req, res, next) => {
    res.send('ok')
})

apiRouter.use('/products', productRouter)
apiRouter.use('/accounts/sellers', sellerRouter)
apiRouter.use('/accounts/buyers', buyerRouter)
apiRouter.use('/', authenticationRouter)
