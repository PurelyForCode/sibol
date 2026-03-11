import { unlink } from 'fs/promises'
import path from 'path'
import { ImagePath } from '../../domain/shared/value_objects/ImagePath.js'
import { ImageStorage } from '../../domain/shared/interfaces/ImageStorage.js'

export class FileSystemImageStorage implements ImageStorage {
    constructor(private readonly baseDir: string) {}

    async delete(url: ImagePath): Promise<boolean> {
        const relativePath = url.value

        const fullPath = path.resolve(this.baseDir, relativePath)

        // Prevent path traversal
        if (!fullPath.startsWith(path.resolve(this.baseDir))) {
            throw new Error('Invalid image path')
        }

        try {
            await unlink(fullPath)
            return true
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return false
            }
            throw error
        }
    }
}
