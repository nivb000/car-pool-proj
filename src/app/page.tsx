import { redirect } from "next/navigation"

export default function Home() {

  // TODO: CHECK IF LOGGED IN REDIRECT RECORD ELSE REDIRECT LOGIN
  redirect('/record')

  //SORT TABLE BY LAST ONE
  //ADD USER AUTH
  //REPLACE RECORD DRIVER WITH THE CURRENT LOGGED USER

  return <section className="home-page">
    <h3>Hi from homepage</h3>
  </section>
}
