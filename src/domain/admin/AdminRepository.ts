import { EntityId } from '../../../../lib/EntityId.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { Admin } from '../entities/admin/Admin.js'
import { RepositoryFactory } from '../../../../lib/interfaces/RepositoryFactory.js'

export interface AdminRepository extends Repository<Admin, EntityId> {}
export interface AdminRepositoryFactory extends RepositoryFactory<AdminRepository> {}
