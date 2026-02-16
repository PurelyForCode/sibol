import { ProductImage } from '../../domain/model/product_image/ProductImage.js'

export interface ImageStorage {
    exists(url: string): Promise<boolean>
    delete(url: string): Promise<void>
    save(name: string, file: Buffer): Promise<void>
}
