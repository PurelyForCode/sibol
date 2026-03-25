import * as psgc from '@jobuntux/psgc'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const BATCH_SIZE = 1000

function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size))
    }
    return chunks
}

async function insertBatch(
    client: Client,
    table: string,
    columns: string[],
    rows: any[][],
) {
    let query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES `
    const values: any[] = []

    let idx = 1

    for (const row of rows) {
        const placeholders = row.map(() => `$${idx++}`)
        query += `(${placeholders.join(', ')}),`
        values.push(...row)
    }

    query = query.slice(0, -1)

    await client.query(query, values)
}

async function seed() {
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

    await client.connect()

    try {
        await client.query('BEGIN')

        // ---------------- REGIONS ----------------
        const regions = psgc.listRegions()
        for (const chunk of chunkArray(regions, BATCH_SIZE)) {
            const rows = chunk.map(r => [r.regCode, r.psgcCode, r.regionName])

            await insertBatch(client, 'regions', ['id', 'code', 'name'], rows)
        }

        console.log('Regions inserted')

        // ---------------- PROVINCES ----------------
        const provinces = psgc.listProvinces()
        for (const chunk of chunkArray(provinces, BATCH_SIZE)) {
            const rows = chunk.map(p => [p.provCode, p.psgcCode, p.provName])

            await insertBatch(client, 'provinces', ['id', 'code', 'name'], rows)
        }

        console.log('Provinces inserted')

        // ---------------- CITIES / MUNICIPALITIES ----------------
        const cities = psgc.listMuncities()
        for (const chunk of chunkArray(cities, BATCH_SIZE)) {
            const rows = chunk.map(c => [
                c.munCityCode,
                c.psgcCode,
                c.munCityName,
            ])

            await insertBatch(
                client,
                'municipalities_cities',
                ['id', 'code', 'name'],
                rows,
            )
        }

        console.log('Cities/Municipalities inserted')

        // ---------------- BARANGAYS ----------------
        const barangays = psgc.listBarangays()
        for (const chunk of chunkArray(barangays, BATCH_SIZE)) {
            const rows = chunk.map(b => [b.brgyCode, b.psgcCode, b.brgyName])

            await insertBatch(client, 'barangays', ['id', 'code', 'name'], rows)
        }

        console.log('Barangays inserted')

        await client.query('COMMIT')
        console.log('Seeding completed successfully')
    } catch (err) {
        await client.query('ROLLBACK')
        console.error('Seeding failed:', err)
    } finally {
        await client.end()
    }
}

seed()
