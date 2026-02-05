import { EntityId } from "../../../../lib/EntityId.js";
import { Account } from "../../domain/entities/Account.js";
import { AccountRepository } from "../../domain/repositories/AccountRepository.js";

export class PostgresqlAccountRepository implements AccountRepository {
    findById(id: EntityId): Promise<Account> {
        throw new Error("Method not implemented.");
    }
    existsById(id: EntityId): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    create(T: Account): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: EntityId): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(T: Account): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
