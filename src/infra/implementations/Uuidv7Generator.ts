import { uuidv7 } from 'uuidv7'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { EntityId } from '../../lib/domain/EntityId.js'

export class Uuidv7Generator implements IdGenerator {
    generate(): EntityId {
        return EntityId.create(uuidv7())
    }
}
