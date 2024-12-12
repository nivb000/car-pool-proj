import { Car } from "@/interfaces/car"
import { CarPreview } from "./car-preview"

export const CarList = ({ cars } : {cars: Car[]}) => {
    return <section className="flex col car-list">
        {cars.map(car => <CarPreview key={car._id} car={car} />)}
    </section>
}
