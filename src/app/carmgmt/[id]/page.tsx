"use client"
import { httpService } from '@/services/http.service'
import { useState, useEffect } from 'react'

const CarManagmentDetails = ({ params }: { params: { id: string } }) => {

    // TODO: LEFT records with the car
    // RIGHT: Car requests table

    const [car, setCar] = useState()

    useEffect(() => {
        getCar()
    }, [])

    const getCar = async () => {
        const res = await httpService.get(`car?id=${params.id}`)
        setCar(res.car)
    }


    return <section className="car-managment-details">
        <div className='gradient-overlay'>
            <div className='main-layout'>
                <div className="top-section main-layout">
                    <h1>ניהול רכב {params.id}</h1>
                    <div className='info-section'>
                        <ul className='flex'>
                            <li>
                                <p>חברה <br /><strong>יונדאי</strong></p>
                            </li>
                            <li>
                                <p>דגם<br /><strong>איוניק</strong></p>
                            </li>
                            <li>
                                <p>שנה<br /><strong>2020</strong></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <section className='flex space-between main-container main-layout'>
            <section className='right-section'>RIGHT</section>
            <section className='left-section'>LEFT</section>
        </section>
    </section>
}
export default CarManagmentDetails
