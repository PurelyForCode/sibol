import { Router } from 'express'
import { buyerRouter } from './routers/BuyerRouter.js'

export const webRouter = Router({ mergeParams: true })

webRouter.use('/buyers', buyerRouter)
