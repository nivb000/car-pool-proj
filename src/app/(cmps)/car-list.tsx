import { Car } from "@/interfaces/car"
import { CarPreview } from "./car-preview"
import Link from "next/link"

export const CarList = ({ cars } : {cars: Car[]}) => {
    return <section className="flex col car-list">
        {cars.map(car => <Link href={`/carmgmt/${car._id}`}>
            <CarPreview key={car._id} car={car} />
        </Link>
        )}
    </section>
}
