import { StoreNameAlreadyExistsException } from '../../../exceptions/seller/StoreNameAlreadyExistsException'
import { StoreSlugAlreadyExistsException } from '../../../exceptions/seller/StoreSlugAlreadyExistsException'
import { StoreName } from './StoreName'
import { StoreSlug } from './StoreSlug'
import { StoreUniquenessChecker } from './StoreUniquenessChecker'

export class StoreUniquenessService {
    constructor(private readonly uniquenessChecker: StoreUniquenessChecker) {}

    async assertStoreNameIsUnique(storeName: StoreName) {
        if (!(await this.uniquenessChecker.isStoreNameUnique(storeName))) {
            throw new StoreNameAlreadyExistsException(storeName.value)
        }
    }

    async assertStoreSlugIsUnique(slug: StoreSlug) {
        if (!(await this.uniquenessChecker.isStoreSlugUnique(slug))) {
            throw new StoreSlugAlreadyExistsException(slug.value)
        }
    }
}
