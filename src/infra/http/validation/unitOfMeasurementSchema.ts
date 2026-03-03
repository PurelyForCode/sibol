import z from 'zod'

export const unitOfMeasurementSchema = z.enum([
    'kg',
    'g',
    'lbs',
    'l',
    'ml',
    'pcs',
])
