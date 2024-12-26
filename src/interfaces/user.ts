export interface MiniCar {
    model: string,
    licenseNumber: string
}

export interface User {
    _id: string,
    email: string,
    name: string,
    isAdmin: boolean,
    managerId?: string,
    cars: MiniCar[]
}