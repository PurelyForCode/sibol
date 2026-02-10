import dotenv from 'dotenv'
import path from 'path'
import { Client } from 'pg'
import { readFileSync } from 'fs'

dotenv.config()

export async function seed() {
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

        // Read your SQL file
        const sqlPath = path.join(process.cwd(), 'sql', 'seed.sql') // make sure your SQL is here
        const sql = readFileSync(sqlPath, 'utf-8')

        // Execute the SQL
        await client.query(sql)
        console.log('Successfully seeded database')
    } catch (err) {
        console.error('Error initializing schema:', err)
    } finally {
        await client.end()
    }
}

await seed()
