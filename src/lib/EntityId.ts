export class EntityId {
    private readonly id: string

    constructor(value: string) {
        this.id = value
    }

    get value(): string {
        return this.id
    }

    equals(other: EntityId): boolean {
        return this.value === other.value
    }
}
