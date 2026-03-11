import { EntityId } from '../../../domain/shared/EntityId.js'
import { PgBaseRepository } from './PgBaseRepository.js'
import { ReviewImageRow, ReviewRow } from '../tables/TableDefinitions.js'
import { Knex } from 'knex'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'
import { ReviewRepository } from '../../../domain/review/ReviewRepository.js'
import { Review } from '../../../domain/review/Review.js'
import { ReviewImage } from '../../../domain/review/ReviewImage.js'
import { ReviewMessage } from '../../../domain/review/ReviewMessage.js'
import { Rating } from '../../../domain/shared/value_objects/Rating.js'
import { ImagePath } from '../../../domain/shared/value_objects/ImagePath.js'
import { ImagePosition } from '../../../domain/shared/value_objects/ImagePosition.js'

export class PgReviewRepository
    extends PgBaseRepository<Review>
    implements ReviewRepository
{
    constructor(
        private readonly knex: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {
        super()
    }

    async findById(id: EntityId): Promise<Review | null> {
        const row = await this.knex<ReviewRow>('reviews')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        const imageRows = await this.knex<ReviewImageRow>(
            'review_images',
        ).where('review_id', row.id)
        return this.map(row, imageRows)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.knex<ReviewRow>('reviews')
            .where('id', id.value)
            .first()
        return !!row
    }

    async save(entity: Review): Promise<void> {
        const snapshot = this.getSnapshot(entity.id)
        if (snapshot) {
            const deletedImages = this.getDeletedIds(
                snapshot.images,
                entity.images,
            )
            await this.knex('review_images')
                .delete()
                .whereIn('id', deletedImages)
        }

        await this.knex<ReviewRow>('reviews')
            .insert({
                id: entity.id.value,
                sale_id: entity.saleId.value,
                message: entity.message ? entity.message.value : null,
                rating: entity.rating.value,
                buyer_id: entity.buyerId.value,
                created_at: entity.createdAt,
                updated_at: entity.updatedAt,
            })
            .onConflict('id')
            .merge()

        for (const [_, v] of entity.images) {
            await this.knex<ReviewImageRow>('review_images')
                .insert({
                    id: v.id.value,
                    position: v.position.value,
                    review_id: v.reviewId.value,
                    url: v.url.value,
                })
                .onConflict('id')
                .merge()
        }
        this.uow.registerAggregate(entity)
    }

    async delete(id: EntityId): Promise<void> {
        await this.knex('reviews').delete().where('id', id.value)
    }

    private map(row: ReviewRow, imageRows: ReviewImageRow[]): Review {
        const id = EntityId.create(row.id)
        const buyerId = EntityId.create(row.buyer_id)
        const productId = EntityId.create(row.sale_id)
        const message = row.message
            ? ReviewMessage.create(row.message).getValue()
            : null
        const rating = Rating.create(row.rating).getValue()

        let images: Map<string, ReviewImage> = new Map()
        for (const i of imageRows) {
            const id = EntityId.create(i.id)
            const reviewId = EntityId.create(i.review_id)
            const url = ImagePath.create(i.url).getValue()
            const position = ImagePosition.create(i.position).getValue()
            images.set(i.id, ReviewImage.rehydrate(id, reviewId, url, position))
        }
        return Review.rehydrate(
            id,
            buyerId,
            productId,
            message,
            rating,
            images,
            row.created_at,
            row.updated_at,
        )
    }
}
