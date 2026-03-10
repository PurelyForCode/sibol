export function validateEnvVariables() {
    if (!process.env.DB_HOST) {
        throw new Error(`Environment variable DB_HOST is not defined in .env`)
    }

    if (!process.env.DB_NAME) {
        throw new Error(`Environment variable DB_NAME is not defined in .env`)
    }

    if (!process.env.DB_USERNAME) {
        throw new Error(
            `Environment variable DB_USERNAME is not defined in .env`,
        )
    }

    if (!process.env.DB_PASSWORD) {
        throw new Error(
            `Environment variable DB_PASSWORD is not defined in .env`,
        )
    }

    if (!process.env.DB_PORT) {
        throw new Error(`Environment variable DB_PORT is not defined in .env`)
    } else {
        try {
            Number.parseInt(process.env.DB_PORT)
        } catch (e) {
            throw new Error(
                `Environment variable MAXIMUM_PRODUCT_IMAGE_COUNT is defined but is not an integer`,
            )
        }
    }

    if (!process.env.ARGON_SALT) {
        throw new Error(
            `Environment variable ARGON_SALT is not defined in .env`,
        )
    }

    if (!process.env.MAXIMUM_PRODUCT_IMAGE_COUNT) {
        throw new Error(
            `Environment variable MAXIMUM_PRODUCT_IMAGE_COUNT is not defined in .env`,
        )
    }
    try {
        Number.parseInt(process.env.MAXIMUM_PRODUCT_IMAGE_COUNT)
    } catch (e) {
        throw new Error(
            `Environment variable MAXIMUM_PRODUCT_IMAGE_COUNT is defined but is not an integer`,
        )
    }
}
