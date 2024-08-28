"use server"

import { getByEmail } from '../user/user.service'
import { LoginFormSchema } from '@/lib/definitions'
import { FormState } from '@/interfaces/formState'
import { createSession, deleteSession } from './session.service'
import bcrypt from 'bcrypt'


export async function login(state: FormState, formData: FormData) {


  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })


  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  const user = await getByEmail(email)
  if (!user) return { message: 'Cannot find user' }

  // const passwordMatch = await bcrypt.compare(password, user.password)
  const passwordMatch = password === user.password

  if (passwordMatch) {
    delete user.password
  } else {
    return { message: 'Cannot find user' }
  }

  const userId = user._id.toString()
  await createSession(userId)
}


// export async function signup(email, password, fullname) {
//   if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')
//   const hash = await bcrypt.hash(password, 10)
//   return userService.add({ username, password: hash, fullname })
// }


export async function logout() {
  deleteSession()
}