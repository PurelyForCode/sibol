import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { apiRouter } from './infra/http/api.js'

function main() {
    const app = express()
    app.use(json())
    app.use(urlencoded())
    app.use('/api', apiRouter)
    app.listen(3000, () => {
        console.log('App is running on localhost:3000')
    })
}

main()
