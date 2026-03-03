export type Id = string
export class EntityId {
    private readonly id: string

    private constructor(value: string) {
        this.id = value
    }

    static create(value: string) {
        return new EntityId(value)
    }

    get value(): string {
        return this.id
    }

    equals(other: EntityId): boolean {
        return this.value === other.value
    }
}
