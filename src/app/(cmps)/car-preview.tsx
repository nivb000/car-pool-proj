import { Car } from "@/interfaces/car"

export const CarPreview = ({ car }: { car: Car }) => {
    return <div className="flex car-preview">
        <div className="car-preview-img">
            <img src="https://i.pcmag.com/imagery/reviews/05S8AeOXKDbTpRaXOwdLSW2-8.fit_scale.size_1028x578.v1569479811.jpg" alt="car-preview-image" />
        </div>
        <div className="flex col space-between car-preview-text">
            <h1>{car.manufacturer} {car.model}</h1>
            <p>מספר רכב: {car.licenseNumber}</p>
            <p>אחראי רכב: {car.owner.name}</p>
        </div>
    </div>
}
