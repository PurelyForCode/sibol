import { ImagePath } from '../value_objects/ImagePath.js'

export interface ImageStorage {
    delete(url: ImagePath): Promise<boolean>
}
