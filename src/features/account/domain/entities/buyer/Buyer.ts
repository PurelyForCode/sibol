import { EntityId } from '../../../../../lib/EntityId.js'
import { Email } from '../Email.js'

export class Buyer {
    private constructor(
        private id: EntityId,
        private email: Email,
        private password: string,
    ) {}

    static create(id: EntityId, email: Email, password: string) {}
}
