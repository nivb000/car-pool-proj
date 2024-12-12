import { redirect } from 'next/navigation'
import LoginForm from './(cmps)/login-form'
import { getUser } from '@/services/server/auth/session.service'

const Home = async () => {

  //TODO: CRUD ON CARS
  //CAR DETAILS PAGE (SHOW ORDERS AND RECORDS FROM CAR)
  //ORDERS full flow
  // Add user manager Id
  //Aggregation show only records from relevent car
  //ADD user managment
  //Try combine update and add to one cmp
  //Make sure you cant edit or add if not admin and not logged in


  const user = await getUser() || null

  {user && redirect('record')}

  return <section className="home-page">
    <LoginForm />
  </section>
}
export default Home