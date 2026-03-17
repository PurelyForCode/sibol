import { Router } from 'express'

export const buyerRouter = Router({ mergeParams: true })

buyerRouter.get('/home', (req, res, next) => {
    res.render('buyers/pages/home')
})
