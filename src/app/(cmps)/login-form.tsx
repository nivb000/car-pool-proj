"use client"
import { useFormState } from 'react-dom'
import { login } from '../../services/server/auth/auth.service'
import { useState, useEffect } from 'react'

const LoginForm = () => {

  const [state, action, pending] = useFormState(login, undefined)
  const [isLogin, setisLogin] = useState(false)
  

  const handleIsLogin = () => {
    setisLogin(true)
  }

  useEffect(() => {
    return () => setisLogin(false)
  }, [])


  return <form className='flex col space-between login-form' action={action}>
    <h3>ברוך הבא למערכת CAR POOL</h3>
    <div className='flex align-center space-between input-wrapper'>
      <label htmlFor="email">אימייל:</label>
      <input type="email" name="email" id='email' />
    </div>
    <div className='flex align-center space-between input-wrapper'>
      <label htmlFor="password">סיסמה:</label>
      <input type="password" name="password" id='password' />
    </div>
    <button type="submit" className="submit-btn" onClick={handleIsLogin} >
      {isLogin ? "מתחבר..." : "התחבר"}
    </button>
  </form>
}
export default LoginForm