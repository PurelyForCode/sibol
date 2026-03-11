import { Result } from '../../../types/utils/Result.js'
import { SingleValueObject } from '../SingleValueObject.js'
import { extname } from 'path'

export class ImagePath extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(path: string): Result<ImagePath> {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            try {
                const parsed = new URL(path)
                return Result.ok(new ImagePath(parsed.href))
            } catch {
                return Result.fail(`Invalid URL: ${path}`)
            }
        }

        const ext = extname(path).toLowerCase()
        if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
            return Result.fail(`Invalid image file extension: ${ext}`)
        }

        return Result.ok(new ImagePath(path))
    }

    isRemote(): boolean {
        return (
            this.value.startsWith('http://') ||
            this.value.startsWith('https://')
        )
    }

    isLocal(): boolean {
        return !this.isRemote()
    }
}
