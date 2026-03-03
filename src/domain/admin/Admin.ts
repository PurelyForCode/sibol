import { EntityId } from '../shared/EntityId.js'

export class Admin {
    private constructor(
        private id: EntityId,
        private email: string,
        private password: string,
        private role: string,
    ) {}
}
