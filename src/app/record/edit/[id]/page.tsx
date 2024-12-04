"use client"
import { useState} from "react"
import { Button } from "@mui/material"
import Image from "next/image"
import carOrder from "@/assets/imgs/order-car.png"
import { useSearchParams } from 'next/navigation'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import useSWR from 'swr'
import {fetcher} from '@/lib/fetcher'
import { httpService } from "@/services/http.service"
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Record } from "@/interfaces/record"
import { getRecordById } from "@/services/server/record/record.controller"


//TODO: Fix record received and to edit
//TODO: SNACKBAR


const RecordEdit = async({ params }: { params: { id: string } }) => {

    const record: Record = await getRecordById(params.id) 
    const searchParams = useSearchParams()
    const { data: user, error, isLoading } = useSWR('/api/auth', fetcher)
    const [openAlert, setOpenAlert] = useState(false)
    const handleClick = () => {
        setOpenAlert(true)
    };

    // useEffect(() => {
    //     if (data) setToy(data)
    // }, [data])
  
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false)
    };
    
    

    const [record, setRecord] = useState({
        driver:{...user},
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
        setOpenAlert(true)
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

        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}>
          נסיעה נוספה בהצלחה
        </Alert>
      </Snackbar>

    </section>
}

export default RecordEdit