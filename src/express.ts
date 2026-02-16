import express, { json, urlencoded } from 'express'
import { sellerRouter } from './infra/http/routers/SellerRouter.js'
import { buyerRouter } from './infra/http/routers/BuyerRouter.js'
import { appExceptionMiddleware } from './infra/http/middleware/appExceptionMiddleware.js'
import { productRouter } from './infra/http/routers/ProductRouter.js'

export const app = express()

app.use(json())
app.use(urlencoded())

app.use('/sellers', sellerRouter)
app.use('/buyers', buyerRouter)
app.use('/products', productRouter)

app.use(appExceptionMiddleware())
