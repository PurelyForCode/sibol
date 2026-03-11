import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { apiRouter } from './src/infra/http/api.js'
import { validateEnvVariables } from './src/utils/validateEnvVariables.js'

function main() {
    validateEnvVariables()
    const app = express()
    app.use(json())
    app.use(urlencoded())
    app.use(express.static('uploads'))
    app.use('/api', apiRouter)
    const port = process.env.APP_PORT
        ? Number.parseInt(process.env.APP_PORT)
        : 3001
    app.listen(port, () => {
        console.log(`App is running on http://localhost:${port}`)
    })
}

main()
