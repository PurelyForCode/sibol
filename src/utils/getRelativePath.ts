import path from 'path'

export function getRelativePath(fullPath: string) {
    const uploadDir = path.resolve('uploads')
    return path.relative(uploadDir, fullPath)
}
