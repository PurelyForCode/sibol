import * as m from 'multer'
import path from 'path/posix'

const uploadDir = path.resolve(process.cwd(), 'uploads')
const diskStorage = m.diskStorage({ destination: uploadDir })
export const fileStorage = m.default({ storage: diskStorage })
