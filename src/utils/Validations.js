import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").refine(s => /^[a-zA-Z0-9_-]+$/.test(s), {
        message: "Only letters, No characters allowed"
    }),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, "Password should be at least 6 characters").refine(s => /[a-zA-Z]/.test(s), {
        message: "Password must contain letters"
    }).refine(s => /\d/.test(s), {
        message: "Password must contain numbers"
    }).refine(s => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
        message: "Password must contain special characters."
    })
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, "Password should be at least 6 characters").refine(s => /[a-zA-Z]/.test(s), {
        message: "Password must contain letters"
    }).refine(s => /\d/.test(s), {
        message: "Password must contain numbers"
    }).refine(s => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
        message: "Password must contain special characters."
    })
})