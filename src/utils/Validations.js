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



export const postCreationSchema = z.object({
    title: z
      .string()
      .min(10, "Title must be at least 10 characters long")
      .max(100, "Title must not exceed 100 characters")
      .regex(/^[a-zA-Z0-9\s.,!?'-]+$/, "Title can only contain letters, numbers, basic punctuation, and apostrophes"),
  
    description: z
      .string()
      .min(100, "Description must be at least 100 characters long")
      .max(5000, "Description must not exceed 5000 characters"),
  
    coverImage: z
      .string()
      .url("Cover image must be a valid URL")
      .refine(url => url.startsWith('https://'), {
        message: "Cover image URL must use HTTPS"
      }),
  
    optionalImages: z
      .array(
        z.string()
          .url("Optional image must be a valid URL")
          .refine(url => url.startsWith('https://'), {
            message: "Optional image URL must use HTTPS"
          })
      )
      .max(5, "You can add up to 5 optional images")
      .optional(),
  
    link: z
      .string()
      .url("External link must be a valid URL")
      .refine(url => url.startsWith('https://'), {
        message: "External link must use HTTPS"
      })
      .optional(),
  
    category: z
      .string()
      .min(3, "Category must be at least 3 characters long")
      .max(30, "Category must not exceed 30 characters")
      .regex(/^[a-zA-Z\s]+$/, "Category can only contain letters and spaces")
      .optional(),
  
    readTime: z
      .string()
      .regex(/^\d+\s*min(ute)?s?\s*read$/, "Read time should be in the format '5 min read' or '5 minutes read'")
      .optional()
  });
  

// author: z.object({
    // name: z
    //   .string()
    //   .min(2, "Author name must be at least 2 characters long")
    //   .max(50, "Author name must not exceed 50 characters")
    //   .regex(/^[a-zA-Z\s-]+$/, "Author name can only contain letters, spaces, and hyphens"),
    // email: z
    //   .string()
//     //   .email("Invalid email address")
//   }),