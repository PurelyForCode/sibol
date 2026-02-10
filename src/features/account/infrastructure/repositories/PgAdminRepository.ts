import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { Admin } from '../../domain/entities/admin/Admin.js'
import {
    AdminRepository,
    AdminRepositoryFactory,
} from '../../domain/repositories/AdminRepository.js'

export class PostgresqlAdminRepositoryFactory implements AdminRepositoryFactory {
    create(props: any): Repository<any, any> {
        throw new Error('Method not implemented.')
    }
}

export class PostgresqlAdminRepository implements AdminRepository {
    constructor(private readonly k: Knex.Transaction) {}

    findById(id: EntityId): Promise<Admin | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: EntityId): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    save(T: Admin): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(id: EntityId): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
