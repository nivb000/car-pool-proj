import { verifyAdmin } from "@/services/server/auth/session.service"
import { query as getCars } from "@/services/server/car/car.service"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@mui/material"
import { CarList } from "../(cmps)/car-list"


//cars view/add is SSR

const CarManagment = async () => {

    const user = await verifyAdmin()

    if (!user.isAuth) redirect("/")
    else if (!user.isAdmin) return <div>אין לך הרשאות מנהל</div>


    const cars = await getCars()



    return <section className="main-layout car-app">
        <div className="flex space-between align-center car-app top-section">
            <p>ניהול רכבים</p>
            <Link href={``}>
                <Button variant="contained" color="success">הוסף רכב חדש</Button>
            </Link>
        </div>
        <div>
            <CarList cars={cars} />
        </div>

    </section>
}
export default CarManagment