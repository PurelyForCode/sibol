import * as m from 'multer'

const diskStorage = m.diskStorage({ destination: 'uploads/' })
export const fileStorage = m.default({ storage: diskStorage })
