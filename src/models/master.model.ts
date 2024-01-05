// libraries
import { z } from 'zod';

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// // Regular expression pattern for "DD-MM-YYYY" format
// const DATE_REGEX_PATTERN = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
export const masterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    gender: z.enum(['male', 'female', 'other']),
    // dateOfBirth: z.string().refine((date) => {
    //     return DATE_REGEX_PATTERN.test(date);
    // }, {
    //     message: "Date of birth must be in the DD-MM-YYYY format",
    // }).refine((date) => {
    //     const currentDate = new Date();
    //     const inputDate = new Date(date.split("-").reverse().join("-"));
    //     return inputDate <= currentDate;
    // }, {
    //     message: "Date of birth cannot be in the future",
    // }).refine((date) => {
    //     const currentDate = new Date();
    //     const inputDate = new Date(date.split("-").reverse().join("-"));
    //     const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    //     return inputDate <= minDate;
    // }, {
    //     message: "You must be at least 18 years old",
    // }),
    country: z.enum(['India', 'International']),
    experience: z.string().transform((val) => Number(val)),
    phoneNumber: z.string(),
    masterIntroduction: z.string(),
    language: z.array(z.enum([
        "English",
        "Hindi",
        "Bengali",
        "Punjabi",
        "Gujarati",
        "Marathi",
        "Odia",
        "Konkani",
        "Sindhi",
        "Tamil",
        "Malayalam",
        "Kannada",
        "Telugu",
    ])),
    // masterCategories: z.enum(['Tarot Card Reader', 'Vedic Astrologer', 'Palmistry', 'Numerology', 'Vastu']),
    // cutPrice: z.string().transform((val) => Number(val)).optional(),
    // price: z.string().transform((val) => Number(val)),
    // free: z.string().transform((val) => Boolean(val)).optional(),
    // divide: z.string().transform((val) => Number(val)).optional(),
    // badge: z.enum(['Star Astrologer', 'verified']).optional(),
    // skills: z.enum(['Love', 'Marriage', 'Career', 'Life', 'Business', 'Health']).optional(),
    // contract: z.enum(['Standard', 'Exclusive']).optional(),
    // segments: z.enum(['A', 'B', 'C', 'D', 'E', 'F']).optional(),
    // tags: z.enum(["Most Choice", "Most Trusted"]).optional(),
    // ratings: z.enum(['1', '2', '3', '3.5', '4', '4.5', '5']).optional(),
    // followers: z.string().transform((val) => Number(val)).optional(),
    // status: z.enum(['Enable', 'Disable']).optional(),
    // registrationDate: z.string().optional(),
    // masterDateOfBirth: z.string().optional(),
    // specialties: z.array(z.enum(['Love', 'Marriage', 'Career', 'life', 'Business', 'Health'])),
    // created: z.string().optional(),
    // profile: z.any().refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 500KB.`)
    //     .refine(
    //         (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //         "Only .jpg, .jpeg, .png and .webp formats are supported."
    //     ),

});

export type masterSchemaType = z.infer<typeof masterSchema>;