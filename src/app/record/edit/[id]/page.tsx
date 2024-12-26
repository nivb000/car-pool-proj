"use client"
import { useState, useEffect } from "react"
import { Button, MenuItem} from "@mui/material"
import { useRouter } from 'next/navigation'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { httpService } from "@/services/http.service"
import { Loader } from "@/app/(cmps)/loader"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { AlertBar } from "@/app/(cmps)/alert-bar"
import { SnackbarOrigin } from '@mui/material/Snackbar'
import dayjs from 'dayjs'
import Image from "next/image"
import carOrder from "@/assets/imgs/order-car.png"
import { Record } from "@/interfaces/record"
import { User, MiniCar } from "@/interfaces/user"

interface State extends SnackbarOrigin {
    open: boolean;
}

const RecordEdit = ({ params }: { params: { id: string } }) => {

    const router = useRouter()
    const [alertMsg, setAlertMsg] = useState("")
    const [alertState, setAlertState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })
    const [cars, setCars] = useState<MiniCar[]>([])
    const [record, setRecord] = useState<Record>({
        driver: {
            _id: '',
            name: '',
        },
        startKm: 0,
        driveEndKm: 0,
        startDate: dayjs(),
        endDate: dayjs(),
        destinationPoint: "",
        startingPoint: "",
        carLicenseNumber: '',
        status: 'completed'
    })

    useEffect(() => {
        const fetchUser = async () => {
            const user: User = await httpService.get('auth')
            setRecord(prev => ({
                ...prev,
                carLicenseNumber: user.cars[0].licenseNumber,
                driver: {
                    _id: user._id,
                    name: user.name
                }
            }))
            setCars(user.cars)
        }
        const fetchRecord = async () => {
            const res = await httpService.get(`record?id=${params.id}`)
            res.record.startDate = dayjs(res.record.startDate)
            res.record.endDate = dayjs(res.record.endDate)
            setRecord(res.record)
        }
        fetchUser()
        fetchRecord()
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
        setAlertMsg(`נסיעה ${id} עודכנה בהצלחה`)
        setAlertState(prevState => ({ ...prevState, open: true }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        await httpService.put('record', record)
        if (record._id) showSnackBar(record._id)
        setTimeout(() => {
            router.push('/record')
            router.refresh()
        }, 1500)
    }

    return <section className="flex space-evenly record-edit">
        <section className="form-container flex col align-center">
            <div className="wrapper">
                <h1>עדכן נסיעה</h1>
                <form className="flex col space-between" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="startingPoint"></label>
                        <input type="text" name="startingPoint" value={record.startingPoint} id="startingPoint" placeholder="נקודת מוצא" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="destinationPoint"></label>
                        <input type="text" name="destinationPoint" value={record.destinationPoint} id="destinationPoint" placeholder="נקודת יעד" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="startKm"></label>
                        <input type="number" name="startKm" value={record.startKm} id="startKm" placeholder="קילומטר תחילת נסיעה" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="driveEndKm"></label>
                        <input type="number" name="driveEndKm" value={record.driveEndKm} id="driveEndKm" placeholder="קילומטר סוף נסיעה" onChange={handleChange} />
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
                            עדכן נסיעה
                        </Button>
                    </div>
                </form>
            </div>
        </section>
        <section className="left-section">
            <div className="image-container">
                <Image src={carOrder} width={400} height={400} alt='blue-car-image' priority={false} />
            </div>
        </section>

        <AlertBar msg={alertMsg} snackBarState={alertState} />

    </section>
}

export default RecordEdit