import { Repository } from './Repository.js'

export interface RepositoryFactory {
    register(repo: Repository<any>): void
    get(constructor: Function): Repository<any>
}
