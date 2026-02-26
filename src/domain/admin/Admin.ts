import { EntityId } from '../../lib/domain/EntityId.js'

export class Admin {
    private constructor(
        private id: EntityId,
        private email: string,
        private password: string,
        private role: string,
    ) {}
}
