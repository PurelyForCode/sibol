export abstract class ValueObject<T extends Record<string, unknown>> {
    protected readonly props: Readonly<T>

    protected constructor(props: T) {
        this.props = Object.freeze({ ...props })
    }

    equals(vo?: ValueObject<T>): boolean {
        if (!vo) return false
        if (vo.constructor !== this.constructor) return false

        const keys = Object.keys(this.props) as (keyof T)[]
        return keys.every(key => Object.is(this.props[key], vo.props[key]))
    }
}
