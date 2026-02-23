import { SellerEmailAlreadyExistsException } from '../../../exceptions/seller/SellerEmailAlreadyExistsException.js'
import { StoreNameAlreadyExistsException } from '../../../exceptions/seller/StoreNameAlreadyExistsException.js'
import { StoreSlugAlreadyExistsException } from '../../../exceptions/seller/StoreSlugAlreadyExistsException.js'
import { Email } from '../../shared/value_objects/Email.js'
import { SellerUniquenessChecker } from '../interfaces/StoreUniquenessChecker.js'
import { StoreName } from '../value_objects/StoreName.js'
import { StoreSlug } from '../value_objects/StoreSlug.js'

export class SellerUniquenessService {
    constructor(private readonly uniquenessChecker: SellerUniquenessChecker) {}
    async assertEmailIsUnique(email: Email) {
        if (!(await this.uniquenessChecker.isEmailUniqueWithinSellers(email))) {
            throw new SellerEmailAlreadyExistsException(email.value)
        }
    }

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
