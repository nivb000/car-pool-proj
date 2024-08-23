"use client"
import { useState } from "react"
import { Button } from "@mui/material"
import Image from "next/image"
import carOrder from "@/assets/imgs/order-car.png"
import { httpService } from '@/services/http.service'
import { useSearchParams } from 'next/navigation'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'





const RecordEdit = () => {

    const searchParams = useSearchParams()
    
    const [record, setRecord] = useState({
        driver:{
            _id: 'dsgdklsgkldsdsfsdf',
            fullName: 'John Doe'
        },
        startKm: Number(searchParams.get('lastRideKm')) || 0,
        driveEndKm: 0,
        startDate: dayjs(),
        endDate: dayjs(),
        destinationPoint: "",
        startingPoint: "",
        car: 11111111,
        status: 'completed'
    })

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        
        const name = target.name
        let value: any
        switch (name) {
            case 'startKm':
            case 'driveEndKm':
                value = Number(target.value)
                break;
            default:
                value = target.value
                break
        }
        setRecord(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const newRecord = await httpService.post('record', record)
    }

    return <section className="flex space-evenly record-edit">
        <section className="form-container flex col align-center">
            <div className="wrapper">
                <h1>הוסף נסיעה חדשה</h1>
                <form className="flex col space-between" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="startingPoint"></label>
                        <input type="text" name="startingPoint" id="startingPoint" placeholder="נקודת מוצא" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="destinationPoint"></label>
                        <input type="text" name="destinationPoint" id="destinationPoint" placeholder="נקודת יעד" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="startKm"></label>
                        <input type="number" name="startKm" value={record.startKm} id="startKm" placeholder="קילומטר תחילת נסיעה" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="driveEndKm"></label>
                        <input type="number" name="driveEndKm" id="driveEndKm" placeholder="קילומטר סוף נסיעה" onChange={handleChange} />
                    </div>
                    <div className="datepicker-field" dir="ltr">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                            label="תאריך התחלה"
                            value={record.startDate}
                            onChange={(newValue) => newValue ? setRecord(prevState => ({ ...prevState, startDate: newValue })) : null}
                            ampm={false} />
                        </LocalizationProvider>
                    </div>
                    <div className="datepicker-field" dir="ltr">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                            label="תאריך סיום"
                            value={record.endDate}
                            onChange={(newValue) => newValue ? setRecord(prevState => ({ ...prevState, endDate: newValue })) : null}
                            ampm={false} />
                        </LocalizationProvider>
                    </div>
                    <div className="input-field">
                        <Button variant="contained" color="success" fullWidth type="submit">
                            הוסף נסיעה
                        </Button>
                    </div>
                </form>
            </div>
        </section>
        <section className="left-section">
            <div className="image-container">
                <Image src={carOrder} width={400} height={400} alt='blue-car-image' />
            </div>
        </section>

    </section>
}

export default RecordEdit







// import Image from "next/image"
// import carOrder from "@/assets/imgs/order-car.png"
// import { addRecord } from "@/services/server/record/record.controller"



// const RecordEdit = () => {

    
//     const handleSubmit = async(formData: FormData) => {
//         'use server'
//         const newRecord = {
//             startingPoint: formData.get('startingPoint'),
//             destinationPoint: formData.get('destinationPoint'),
//             startKm: formData.get('startKm'),
//             driveEndKm: formData.get('driveEndKm')
//         }
//         await addRecord(newRecord)
//         alert("RECORD ADDED")
        
//     }


//     return <section className="flex space-evenly record-edit">
//         <section className="form-container flex col align-center">
//             <div className="wrapper">
//                 <h1>הוסף נסיעה חדשה</h1>
//                 <form className="flex col space-between" autoComplete="off" action={handleSubmit}>
//                     <div className="input-field">
//                         <label htmlFor="startingPoint"></label>
//                         <input type="text" name="startingPoint" id="startingPoint" placeholder="נקודת מוצא" />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="destinationPoint"></label>
//                         <input type="text" name="destinationPoint" id="destinationPoint" placeholder="נקודת יעד" />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="startKm"></label>
//                         <input type="number" defaultValue={125} name="startKm" id="destinationPoint" placeholder="קילומטר תחילת נסיעה" />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="destinationPoint"></label>
//                         <input type="number" name="driveEndKm" id="destinationPoint" placeholder="קילומטר סוף נסיעה" />
//                     </div>
//                     <div className="input-field">
//                         <button type="submit">
//                             הוסף נסיעה
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </section>
//         <section className="left-section">
//             <div className="image-container">
//                 <Image src={carOrder} width={500} height={500} alt='blue-car-image' />
//             </div>
//         </section>

//     </section>
// }

// export default RecordEdit