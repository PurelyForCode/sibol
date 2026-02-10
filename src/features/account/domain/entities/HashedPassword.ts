import { SingleValueObject } from '../../../../lib/SingleValueObject.js'

export class HashedPassword extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(hash: string): HashedPassword {
        return new HashedPassword(hash)
    }
}
