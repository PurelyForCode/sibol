import { EntityId } from '../../../../../lib/EntityId.js'

export class Seller {
    private constructor(
        private id: EntityId,
        private email: string,
        private password: string,
        private role: string,
        private storeName: string,
        private rating: number,
        private totalSales: number,
    ) {}
    static create(
        id: EntityId,
        email: string,
        password: string,
        role: string,
        storeName: string,
        rating: number,
        totalSales: number,
    ) {}
}
