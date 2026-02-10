import express, { json, urlencoded } from 'express'
import { productRouter } from './features/product/infrastructure/routers/ProductRouter.js'

export const apiRouter = express()

apiRouter.use(json())
apiRouter.use(urlencoded())
apiRouter.use('/products', productRouter)
