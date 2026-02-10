import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { productRouter } from './features/product/infrastructure/routers/ProductRouter.js'
import { apiRouter } from './api.js'

function main() {
    const app = express()
    app.use(json())
    app.use(urlencoded())
    app.use('/api', apiRouter)
    app.listen(3000, 'localhost', () => {
        console.log('App is running')
    })
}

main()
