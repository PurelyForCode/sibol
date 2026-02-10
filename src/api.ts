import express, { json, urlencoded } from 'express'
import { productRouter } from './features/product/infrastructure/ProductRouter.js'
import { sellerRouter } from './features/account/infrastructure/SellerRouter.js'

export const apiRouter = express()

apiRouter.use(json())
apiRouter.use(urlencoded())
apiRouter.use('/products', productRouter)
apiRouter.use('/accounts/sellers', sellerRouter)
