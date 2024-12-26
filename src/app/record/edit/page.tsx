"use client"
import { useState, useEffect } from "react"
import { Button, MenuItem } from "@mui/material"
import { useSearchParams, useRouter } from 'next/navigation'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { httpService } from "@/services/http.service"
import { AlertBar } from "@/app/(cmps)/alert-bar"
import { SnackbarOrigin } from '@mui/material/Snackbar'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import dayjs from 'dayjs'
import Image from "next/image"
import carOrder from "@/assets/imgs/order-car.png"
import { User, MiniCar } from "@/interfaces/user"

interface State extends SnackbarOrigin {
    open: boolean;
  }

const RecordEdit = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [alertMsg, setAlertMsg] = useState("")
    const [cars, setCars] = useState<MiniCar[]>([])
    const [alertState, setAlertState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })
    

    const [record, setRecord] = useState({
        driver: {
            _id: '',
            name: '',
        },
        startKm: searchParams.get('driveEndKm') || 0,
        driveEndKm: 0,
        startDate: dayjs(),
        endDate: dayjs(),
        destinationPoint: "",
        startingPoint: "",
        carLicenseNumber: '',
        status: 'completed'
    })

    useEffect(() => {
        const fetchUser = async() => {
            const user: User = await httpService.get('auth')
            setRecord(prev => ({...prev,
                carLicenseNumber: user.cars[0].licenseNumber,
                driver:{
                _id: user._id,
                name: user.name
            }}))
            setCars(user.cars)
        }
        fetchUser()
    }, [])
    

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

    const handleCarChange = (event: SelectChangeEvent) => {
        const value = event.target.value
        setRecord(prevRecord => ({...prevRecord, carLicenseNumber: value}))
    }

    const showSnackBar = (id: string) => {
        setAlertMsg(`נסיעה ${id} נוספה בהצלחה`)
        setAlertState(prevState => ({ ...prevState, open: true }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const { res } = await httpService.post('record', record)
        
        showSnackBar(res.insertedId)
        setTimeout(() => {
            router.push('/record')
            router.refresh()
        }, 1500)
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
                    <div className="input-field">
                    {cars && <Select value={record.carLicenseNumber} label="רכב" onChange={handleCarChange}>
                        {cars.map((car: MiniCar, idx: number) => (
                            <MenuItem value={car.licenseNumber} key={idx}>{car.licenseNumber} - {car.model}</MenuItem>
                        ))}
                    </Select>}
                    </div>
                    <div className="datepicker-field" dir="rtl">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                            label="תאריך התחלה"
                            value={record.startDate}
                            onChange={(newValue) => newValue ? setRecord(prevState => ({ ...prevState, startDate: newValue })) : null}
                            ampm={false} />
                        </LocalizationProvider>
                    </div>
                    <div className="datepicker-field" dir="rtl">
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

        <AlertBar msg={alertMsg} snackBarState={alertState} />

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