import { redirect } from 'next/navigation'
import LoginForm from './(cmps)/login-form'
import { getUser } from '@/services/server/auth/session.service'

const Home = async () => {

  //SORT TABLE BY LAST ONE
  //Add admin dashboard
  
  
  //Add car object
  // car licenseNumber:
  // car manufacturer
  // car Model
  // car Year
  // Car currentKM
  // car owner userId
  // Car keysAssignedTo: {User}...(Last driver)

  // Add user manager Id


  const user = await getUser() || null

  {user && redirect('record')}

  return <section className="home-page">
    <LoginForm />
  </section>
}
export default Home