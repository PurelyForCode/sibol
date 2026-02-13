import { Knex } from "knex";
import { Id } from "../../core/interfaces/IdGenerator.js";
import { User } from "../../model/user/User.js";
import { UserRepository } from "../../repositories/UserRepository.js";

export class PgUserRepository implements UserRepository {
	constructor(private readonly knex: Knex.Transaction){}

    insert(model: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(model: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(modelId: Id): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: Id): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    existsById(id: Id): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
