import { Router } from 'express'
import { saleQueryRepository } from '../../../../compositionRoot.js'
import { fakeSellerId } from '../../../../fakeData/fakeId.js'

export const sellerSaleRouter = Router({ mergeParams: true })

sellerSaleRouter.get('/', async (_req, res, next) => {
    try {
        const sellerId = fakeSellerId
        const sales = await saleQueryRepository.findAllBySellerId(sellerId)
        res.json(sales)
    } catch (e) {
        next(e)
    }
})

sellerSaleRouter.get('/:saleId', async (req, res, next) => {
    try {
        const saleId = req.params.saleId
        const sellerId = fakeSellerId
        const sales = await saleQueryRepository.findByIdAndSellerId(
            sellerId,
            saleId,
        )
        res.json(sales)
    } catch (e) {
        next(e)
    }
})
