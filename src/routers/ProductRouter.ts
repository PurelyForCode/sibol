import { Router } from 'express'

export const productRouter = Router({ mergeParams: true })

productRouter.post('/', () => {})
