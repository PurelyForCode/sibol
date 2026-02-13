import { uuidv7 } from 'uuidv7'
import { Id, IdGenerator } from '../interfaces/IdGenerator.js'

export class Uuidv7Generator implements IdGenerator<Id> {
    generate() {
        return uuidv7()
    }
}
