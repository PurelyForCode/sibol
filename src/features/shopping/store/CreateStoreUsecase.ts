import { EntityId } from '../../../domain/shared/EntityId'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager'
import { Address } from '../../../domain/shared/value_objects/Address'
import { Store } from '../../../domain/shopping/store/Store'
import { StoreName } from '../../../domain/shopping/store/StoreName'
import { StoreDescription } from '../../../domain/shopping/store/StoreDescription'
import { Email } from '../../../domain/shared/value_objects/Email'
import { MobilePhoneNumber } from '../../../domain/shared/value_objects/MobilePhoneNumber'
import { StoreNameAlreadyExistsException } from '../../../exceptions/seller/StoreNameAlreadyExistsException'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException'
import { SellerAlreadyHasAStoreException } from '../../../exceptions/seller/SellerAlreadyHasAStoreException'

export type CreateStoreCmd = {
    id: string
    address: {
        addressLine1: string
        addressLine2: string | null
        barangayId: string
        munCityId: string
        provinceId: string
        regionId: string
    }
    addressId: string
    sellerId: string
    name: string
    description: string | null
    supportEmail: string | null
    supportPhone: string | null
}
export class CreateStoreUsecase {
    constructor(
        private tm: TransactionManager,
        private idGen: IdGenerator,
    ) {}
    async execute(cmd: CreateStoreCmd) {
        await this.tm.transaction(async uow => {
            const storeRepo = uow.getStoreRepo()
            const sellerRepo = uow.getSellerRepo()
            const sellerId = EntityId.create(cmd.sellerId)
            if (!(await sellerRepo.findById(sellerId))) {
                throw new SellerNotFoundByIdException(sellerId.value)
            }

            if (await sellerRepo.hasStore(sellerId)) {
                throw new SellerAlreadyHasAStoreException(sellerId.value)
            }

            const now = new Date()
            const address = Address.create(
                this.idGen.generate(),
                cmd.address.regionId,
                cmd.address.provinceId,
                cmd.address.munCityId,
                cmd.address.barangayId,
                cmd.address.addressLine1,
                cmd.address.addressLine2,
                now,
                now,
            )

            const name = StoreName.create(cmd.name).unwrapOrThrow('name')
            if (!(await storeRepo.isStoreNameUnique(name))) {
                throw new StoreNameAlreadyExistsException(name.value)
            }
            const description = cmd.description
                ? StoreDescription.create(cmd.description).unwrapOrThrow(
                      'description',
                  )
                : null
            const supportEmail = cmd.supportEmail
                ? Email.create(cmd.supportEmail).unwrapOrThrow('supportEmail')
                : null
            const supportPhone = cmd.supportPhone
                ? MobilePhoneNumber.create(cmd.supportPhone).unwrapOrThrow(
                      'supportPhone',
                  )
                : null
            const store = Store.new(
                this.idGen.generate(),
                address,
                sellerId,
                name,
                description,
                supportEmail,
                supportPhone,
            )
            await storeRepo.save(store)
        })
    }
}
