import dotenv from 'dotenv'
import path from 'path'
import { Client } from 'pg'
import { readFileSync } from 'fs'

dotenv.config()

export async function schema() {
    const portStr = process.env.DB_PORT
    let port = null
    if (portStr) {
        port = Number.parseInt(portStr)
    } else {
        port = 5432
    }
    const client = new Client({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: port,
    })

    console.log('stuff is heppning')

    try {
        await client.connect()
        console.log('Connected to the database.')

        const sqlPath = path.join(process.cwd(), 'sql', 'drop.sql')
        const sql = readFileSync(sqlPath, 'utf-8')

        await client.query(sql)
    } catch (err) {
        console.error('Error dropping schema:', err)
    } finally {
        await client.end()
    }
}

await schema()
