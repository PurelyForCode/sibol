import path from 'path'
import fs from 'fs/promises'
import { ImageStorage } from '../interfaces/ImageStorage.js'

export class LocalImageStorage implements ImageStorage {
    private storageFolder = path.join(process.cwd(), 'images')

    private async ensureStorageFolder(): Promise<void> {
        await fs.mkdir(this.storageFolder, { recursive: true })
    }

    async exists(url: string): Promise<boolean> {
        try {
            await fs.access(path.join(this.storageFolder, url))
            return true
        } catch {
            return false
        }
    }

    async delete(url: string): Promise<void> {
        await fs.unlink(path.join(this.storageFolder, url))
    }

    async save(name: string, file: Buffer): Promise<void> {
        await this.ensureStorageFolder()
        await fs.writeFile(path.join(this.storageFolder, name), file)
    }
}
