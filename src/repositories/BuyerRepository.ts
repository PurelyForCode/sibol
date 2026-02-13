import { Repository } from '../core/interfaces/Repository.js'
import { Buyer } from '../model/buyer/Buyer.js'

export interface BuyerRepository extends Repository<Buyer> {}
