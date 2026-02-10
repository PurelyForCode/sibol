import { EntityId } from '../../../../../lib/EntityId.js'

export class Buyer {
    private constructor(
        private id: EntityId,
        private email: string,
        private password: string,
        private role: string,
    ) {}

    static create(
        id: EntityId,
        email: string,
        password: string,
        role: string,
    ) {}
}
