import * as m from 'multer'
import path from 'path'

const uploadDir = path.resolve(process.cwd(), 'uploads', 'images')

const diskStorage = m.diskStorage({
    destination: uploadDir,
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = Date.now() + ext
        cb(null, name)
    },
})

export const imageStorageMiddleware = m.default({ storage: diskStorage })
