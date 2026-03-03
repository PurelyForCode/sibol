import { EntityId } from './EntityId.js'

export abstract class Entity {
    constructor(private _id: EntityId) {}

    public get id(): EntityId {
        return this._id
    }
}
