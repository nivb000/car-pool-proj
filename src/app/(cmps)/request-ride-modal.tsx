import { useState, forwardRef } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { Button, MenuItem } from '@mui/material'
import { User } from '@/interfaces/user'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { httpService } from "@/services/http.service"
import { AlertBar } from "@/app/(cmps)/alert-bar"
import { SnackbarOrigin } from '@mui/material/Snackbar'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import dayjs from 'dayjs'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { MiniCar } from '@/interfaces/user'
import { useRouter } from 'next/navigation'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})
interface State extends SnackbarOrigin {
    open: boolean;
}


export const RequestRideModal = ({ user }: { user: User }) => {
    
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [alertState, setAlertState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })


    const [order, setOrder] = useState({
        driver: {
            _id: user._id,
            name: user.name,
        },
        startDate: dayjs(),
        endDate: dayjs(),
        destinationPoint: "",
        startingPoint: "",
        carLicenseNumber: '',
        status: 'pending'
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
        setOrder(prevState => ({ ...prevState, [name]: value }))
    }

    const handleCarChange = (event: SelectChangeEvent) => {
        const value = event.target.value
        setOrder(prevOrder => ({ ...prevOrder, carLicenseNumber: value }))
    }

    const showSnackBar = () => {
        setAlertMsg(`נשלח בהצלחה`)
        setAlertState(prevState => ({ ...prevState, open: true }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const { res } = await httpService.post('order', order)
        showSnackBar()
        setTimeout(() => {
            router.push('/record')
            router.refresh()
        }, 1500)
    }

    return <>
        <Button variant="contained" color="warning" onClick={handleClickOpen}>בקש נסיעה</Button>
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
            <section className='flex col modal-main-wrapper'>
                <div className="wrapper">
                    <h1>בקש נסיעה חדשה</h1>
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
                            {user.cars && <Select value={order.carLicenseNumber} label="רכב" onChange={handleCarChange}>
                                {user.cars.map((car: MiniCar, idx: number) => (
                                    <MenuItem value={car.licenseNumber} key={idx}>{car.licenseNumber} - {car.model}</MenuItem>
                                ))}
                            </Select>}
                        </div>
                        <div className="datepicker-field" dir="rtl">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="תאריך התחלה"
                                    value={order.startDate}
                                    onChange={(newValue) => newValue ? setOrder(prevState => ({ ...prevState, startDate: newValue })) : null}
                                    ampm={false} />
                            </LocalizationProvider>
                        </div>
                        <div className="datepicker-field" dir="rtl">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="תאריך סיום"
                                    value={order.endDate}
                                    onChange={(newValue) => newValue ? setOrder(prevState => ({ ...prevState, endDate: newValue })) : null}
                                    ampm={false} />
                            </LocalizationProvider>
                        </div>
                        <div className="input-field">
                            <Button variant="contained" color="success" fullWidth type="submit">
                                סיום
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </Dialog>
        <AlertBar msg={alertMsg} snackBarState={alertState} />
    </>
}