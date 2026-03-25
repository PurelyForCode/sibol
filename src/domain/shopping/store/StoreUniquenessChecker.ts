import { StoreName } from './StoreName'
import { StoreSlug } from './StoreSlug'

export interface StoreUniquenessChecker {
    isStoreNameUnique(storeName: StoreName): Promise<boolean>
    isStoreSlugUnique(slug: StoreSlug): Promise<boolean>
}
