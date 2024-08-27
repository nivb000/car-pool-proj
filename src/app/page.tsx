import { getSession } from '@auth0/nextjs-auth0'

const Home = async () => {

  //SORT TABLE BY LAST ONE
  //REPLACE RECORD DRIVER WITH THE CURRENT LOGGED USER
  //Add car object
  //Add admin dashboard

  const user = await getSession()

  return <section className="home-page">
    <h3>Hi from login page</h3>
    
  </section>
}
export default Home