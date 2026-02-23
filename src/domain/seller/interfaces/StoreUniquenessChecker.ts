import { Email } from '../../shared/value_objects/Email.js'
import { StoreName } from '../value_objects/StoreName.js'
import { StoreSlug } from '../value_objects/StoreSlug.js'

export interface SellerUniquenessChecker {
    isStoreNameUnique(storeName: StoreName): Promise<boolean>
    isStoreSlugUnique(slug: StoreSlug): Promise<boolean>
    isEmailUniqueWithinSellers(email: Email): Promise<boolean>
}
