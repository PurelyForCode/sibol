import express, { json, urlencoded } from 'express'
import { appExceptionMiddleware } from './http/middleware/appExceptionMiddleware.js'
import { sellerRouter } from './routers/SellerRouter.js'

export const app = express()

app.use(json())
app.use(urlencoded())

app.use('/sellers', sellerRouter)

app.use(appExceptionMiddleware())
