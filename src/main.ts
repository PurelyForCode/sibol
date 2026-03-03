import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { apiRouter } from './infra/http/api.js'

function main() {
    const app = express()
    app.use(json())
    app.use(urlencoded())
    app.use('/api', apiRouter)
    const port = process.env.APP_PORT
        ? Number.parseInt(process.env.APP_PORT)
        : 3000
    app.listen(port, () => {
        console.log(`App is running on http://localhost:${port}`)
    })
}

main()
