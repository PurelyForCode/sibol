import { Repository } from './Repository.js'

export interface RepositoryFactory<T extends Repository<any, any>> {
    create(props: unknown): T
}
