"use client"
import { httpService } from '@/services/http.service'
import { useState, useEffect } from 'react'

const CarManagmentDetails = ({ params }: { params: { id: string } }) => {

    const [car, setCar] = useState()

    useEffect(() => {
        getCar()
    }, [])

    const getCar = async () => {
        const res = await httpService.get(`car?id=${params.id}`)
        setCar(res.car)
    }


    return <section className="main-layout car-managment-details">
        <div className="top-section">
            <p>ניהול רכב {params.id}</p>
        </div>
    </section>
}
export default CarManagmentDetails
