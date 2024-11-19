import { redirect } from 'next/navigation'
import LoginForm from './(cmps)/login-form'
import { getUser } from '@/services/server/auth/session.service'

const Home = async () => {

  //SORT TABLE BY LAST ONE
  //Add car object
  //Add admin dashboard

  const user = await getUser() || null

  {user && redirect('record')}

  return <section className="home-page">
      <LoginForm />
  </section>
}
export default Home