import { parsePhoneNumberFromString } from 'libphonenumber-js'
import * as z from 'zod'

export const phoneNumberSchema = z.string().transform((value, ctx) => {
    const phoneNumber = parsePhoneNumberFromString(value)

    if (!phoneNumber?.isValid()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number',
        })
        return z.NEVER // Return z.NEVER to indicate a validation failure
    }
    return phoneNumber.formatInternational()
})
