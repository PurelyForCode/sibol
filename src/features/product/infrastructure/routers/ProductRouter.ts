import { NextFunction, Router, Request, Response } from "express";
import { ProductController } from "../../adapters/controllers/ProductController.js";
import { CreateProductUsecase } from "../../application/product/CreateProductUseCase.js";
import { PostgresqlProductRepository } from "../repositories/ProductRepository.js";
import { PostgresqlAccountRepository } from "../../../account/infrastructure/repositories/AccountRepository.js";
import { ProductService } from "../../domain/services/ProductService.js";
import { Uuidv7Generator } from "../../../../lib/implementations/Uuidv7Generator.js";
import z from "zod";
import { fakeSellerId } from "../../../../fakeData/fakeId.js";
import { validateInput } from "../../../../lib/middleware/InputValidationMiddleware.js";
import { productController } from "../../../../compositionRoot.js";

export const productRouter = Router({
    mergeParams: true,
})

productRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    try { } catch (e: unknown) { }
})

const createProductRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.int(),
        description: z.string().nullable(),
        rating: z.float32().min(0).max(5),
    })
})
productRouter.post("/", validateInput(createProductRequestSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = (req as z.infer<typeof createProductRequestSchema>).body
        // TODO: Fix this later when doing the account system portion
        const sellerId = fakeSellerId
        const { id } = await productController.createProduct({
            description: body.description,
            name: body.name,
            price: body.price,
            rating: body.rating,
            sellerId: sellerId
        })
        res.status(201).json({ data: { productId: id } })
    } catch (e: unknown) {
        next(e)
    }
})

productRouter.delete("/", (req: Request, res: Response, next: NextFunction) => {
    try { } catch (e: unknown) { }
})


productRouter.put("/", (req: Request, res: Response, next: NextFunction) => {
    try { } catch (e: unknown) { }
})

