"use client"
import { RecordTable } from '@/app/(cmps)/record-table'
import { Car } from '@/interfaces/car'
import { httpService } from '@/services/http.service'
import { useState, useEffect } from 'react'
import { Record } from '@/interfaces/record'
import { User } from '@/interfaces/user'

const CarManagmentDetails = ({ params }: { params: { id: string } }) => {

    // TODO: ELSE LOADING TABLE SKELETON
    // RIGHT: Car requests table

    const [user, setUser] = useState<User>()
    const [car, setCar] = useState<Car>()
    const [records, setRecords] = useState<Record[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await httpService.get(`auth`)
                setUser(res)
                if (res) {
                    const carData = await httpService.get(`car?id=${params.id}`)
                    const data = await httpService.get(`record?licenseNumber=${carData.car.licenseNumber}`)
                    setCar(carData.car)
                    setRecords(data.records)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        getData()
    }, [params])


    const handleDeleteRecord = async (recordId: string) => {
        await httpService.delete(`record?id=${recordId}`)
    }


    return <section className="car-managment-details">
        <div className='gradient-overlay'>
            <div className='main-layout'>
                <section className="top-section main-layout">
                    <h1>רכב {params.id}</h1>
                    <div className='info-section'>
                        <ul className='flex'>
                            <li>
                                <p>חברה <br /><strong>{car?.manufacturer}</strong></p>
                            </li>
                            <li>
                                <p>דגם<br /><strong>{car?.model}</strong></p>
                            </li>
                            <li>
                                <p>שנה<br /><strong>{car?.year}</strong></p>
                            </li>
                            <li>
                                <p>מספר רישוי<br /><strong>{car?.licenseNumber}</strong></p>
                            </li>
                            <li>
                                <p>אחראי רכב<br /><strong>{car?.owner.name}</strong></p>
                            </li>
                            <li>
                                <p>קילומטראז<br /><strong>{car?.currentKM.toLocaleString("he-IL")}</strong></p>
                            </li>
                            <li>
                                {records && (records.length > 0) &&
                                    <p>נהג אחרון<br /><strong>{records[records.length - 1].driver.name}</strong></p>
                                }
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <section className='flex space-between main-container main-layout'>
            <section className='right-section'>RIGHT</section>
            <section className='left-section'>
                {(records && records.length > 0) && user &&
                    <RecordTable user={user} handleDeleteRecord={handleDeleteRecord} initialRecords={records} />
                }
            </section>
        </section>
    </section>
}
export default CarManagmentDetails
