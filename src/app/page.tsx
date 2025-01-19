import { redirect } from 'next/navigation'
import LoginForm from './(cmps)/login-form'
import { getUser } from '@/services/server/auth/session.service'

const Home = async () => {

  //ORDERS full flow
  //TODO: My Orders and complete request to make it a full ride (just add KM and move it to records remove from orders)
  //TODO: CRUD ON CARS
  //CAR DETAILS PAGE (SHOW ORDERS AND RECORDS FROM CAR)
  // Add user manager Id (the user who is register the new user)
  //ADD user managment system
  //Try combine update and add to one cmp
  //Make sure you cant edit or add if not admin and not logged in (useOptimistic)


  const user = await getUser() || null

  {user && redirect('record')}

  return <section className="flex justify-center align-center home-page">
    <LoginForm />
  </section>
}
export default Home