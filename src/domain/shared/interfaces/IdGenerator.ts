import { EntityId } from '../../../lib/domain/EntityId.js'

export interface IdGenerator {
    generate(): EntityId
}
