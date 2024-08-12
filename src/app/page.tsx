import { redirect } from "next/navigation"

export default function Home() {

  // TODO: CHECK IF LOGGED IN REDIRECT RECORD ELSE REDIRECT LOGIN
  redirect('/record')

  //ADD DATE TIME PICKER
  //SORT TABLE BY LAST ONE
  //ADD USER AUTH

  return <section className="home-page">
    <h3>Hi from homepage</h3>
  </section>
}
