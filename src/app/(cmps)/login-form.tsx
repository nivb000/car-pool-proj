"use client"
import { login } from '../../services/server/auth/auth.service'
import { useFormState } from 'react-dom'

const LoginForm = () => {

  const [state, action, pending] = useFormState(login, undefined)

  return <form action={action}>
    <input type="email" name="email" />
    <input type="password" name="password" />
    <button aria-disabled={pending} type="submit" className="submit-btn">
        {pending ? 'Logged in...' : 'Log in'}
    </button>
    </form>
}
export default LoginForm