import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import fs from 'fs'
import path from 'path'

export class ImagePath extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    /**
     * Create an ImagePath from a local file or an internet URL
     * @param input string path or URL
     * @param baseDir optional base directory for local files
     */
    static create(input: string, baseDir?: string): ImagePath {
        if (input.startsWith('http://') || input.startsWith('https://')) {
            try {
                const parsed = new URL(input)
                return new ImagePath(parsed.toString())
            } catch {
                throw new Error(`Invalid URL: ${input}`)
            }
        }

        if (!baseDir) {
            throw new Error('baseDir is required for local files')
        }

        const resolved = path.resolve(baseDir, input)

        // if (!fs.existsSync(resolved)) {
        //     throw new Error(`Local file does not exist: ${resolved}`)
        // }

        if (!resolved.match(/\.(png|jpg|jpeg|webp|gif)$/i)) {
            throw new Error(`Invalid image file extension: ${resolved}`)
        }

        return new ImagePath(resolved)
    }

    isLocal(): boolean {
        return !this.value.startsWith('http')
    }

    isRemote(): boolean {
        return !this.isLocal()
    }
}
