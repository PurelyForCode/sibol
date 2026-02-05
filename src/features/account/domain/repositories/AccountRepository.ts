import { EntityId } from "../../../../lib/EntityId.js";
import { Repository } from "../../../../lib/interfaces/Repository.js";
import { Account } from "../entities/Account.js";

export interface AccountRepository extends Repository<Account, EntityId> { }
