import z from 'zod'
import { Result } from '../../../types/utils/Result'
import { SingleValueObject } from '../../shared/SingleValueObject'

export class StoreSlug extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    public static create(value: string): Result<StoreSlug> {
        return Result.ok(new StoreSlug(value))
    }

    public static fromString(value: string): Result<StoreSlug> {
        const res = z.string().slugify().safeParse(value)
        if (!res.success) {
            return Result.fail('Value can not be transformed into a slug')
        }
        return Result.ok(new StoreSlug(res.data))
    }
}
