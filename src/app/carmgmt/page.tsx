import { verifyAdmin } from "@/services/server/auth/session.service"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@mui/material"


//cars view/add is SSR

const CarManagment = async () => {

    const user = await verifyAdmin()

    if (!user.isAuth) redirect("/")
    else if (!user.isAdmin) return <div>אין לך הרשאות מנהל</div>



    return <section className="main-layout car-app">
        <div className="flex space-between align-center car-app top-section">
            <Link href={``}>
                <Button variant="contained" color="success">הוסף רכב חדש</Button>
            </Link>
            <p>ניהול רכבים</p>
        </div>
        <div className="car-app">

        </div>

    </section>
}
export default CarManagment