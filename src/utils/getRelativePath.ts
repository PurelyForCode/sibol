import path from 'path'

export function getRelativePath(fullPath: string) {
    const uploadDir = path.resolve('uploads', 'images')
    return path.relative(uploadDir, fullPath)
}
