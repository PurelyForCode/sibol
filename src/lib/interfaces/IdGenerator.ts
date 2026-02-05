import { EntityId } from "../EntityId.js";

export interface IdGenerator {
    generate(): EntityId
}
