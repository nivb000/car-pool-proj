import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(5, { message: 'Be at least 5 characters long' })
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(5, { message: 'Be at least 5 characters long' })
    .trim(),
})