import { ImagePath } from '../../domain/shared/value_objects/ImagePath.js'

export interface ImageFile {
    readonly data: Buffer
    readonly mimeType: string
    readonly filename?: string
    readonly size?: number
}

export interface ImageStorage {
    save(image: ImageFile): Promise<ImagePath>
    delete(url: ImagePath): Promise<boolean>
}
