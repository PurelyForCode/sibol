export type Id = string

export interface IdGenerator<T> {
    generate(): T
}
