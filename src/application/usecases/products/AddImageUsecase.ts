import { Id, IdGenerator } from '../../../core/interfaces/IdGenerator.js'
import { ImageStorage } from '../../../core/interfaces/ImageStorage.js'
import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'

export type AddImageCmd = {
    file: File
}

export class AddImageUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator<Id>,
        private readonly imageStorage: ImageStorage,
    ) {}

    async execute(cmd: AddImageCmd) {
        await this.tm.transaction(async uow => {
            const extension = cmd.file.name.split('.')[1]

            await this.imageStorage.save(`test.${extension}`)
        })
    }
}
