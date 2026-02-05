import { uuidv7 } from "uuidv7";
import { EntityId } from "../EntityId.js";
import { IdGenerator } from "../interfaces/IdGenerator.js";

export class Uuidv7Generator implements IdGenerator {
    generate(): EntityId {
        return new EntityId(uuidv7());
    }
}
