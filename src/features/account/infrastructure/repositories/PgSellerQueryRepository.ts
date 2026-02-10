import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import { SellerQueryRepository } from '../../domain/repositories/SellerRepository.js'
import { SellerDto } from '../../adapter/dto/SellerDto.js'

export class PgSellerQueryRepository implements SellerQueryRepository {
    constructor(private readonly k: Knex) {}

    findById(id: EntityId): Promise<SellerDto | null> {
        throw new Error('Method not implemented.')
    }
    findAll(params?: {
        filter?: unknown
        pagination?: { page?: number; limit?: number }
    }): Promise<readonly SellerDto[]> {
        throw new Error('Method not implemented.')
    }
}
