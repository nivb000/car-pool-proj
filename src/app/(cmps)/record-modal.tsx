import { useState, forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { Record } from '@/interfaces/record'
import { Typography } from '@mui/material'
import dayjs from 'dayjs'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const RecordModal = ({ record }: { record: Record }) => {

    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const recordStartDate = dayjs(record.startDate).format('DD/MM/YYYY HH:mm')
    const recordEndDate = dayjs(record.endDate).format('DD/MM/YYYY HH:mm')
    let driveStatus
    switch (record.status) {
        case 'completed':
            driveStatus = 'הושלם'
            break;
        case 'pending':
            driveStatus = 'ממתין לאישור מנהל'
            break;
        case 'rejected':
            driveStatus = 'נדחה'
            break;
        default:
            driveStatus = 'טרם הוזן'
            break;
    }

    return <>
        <Typography onClick={handleClickOpen}>
            {record?.driver?.name}
        </Typography>
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
            <section className='flex col modal-main-wrapper'>

                <h3>{`${record._id} :מזהה נסיעה`}</h3>
                <div className='modal-main-container'>
                    <ul>
                        <li>
                            <div className='flex'>
                                <p>נהג: &nbsp;</p>
                                <span>{record?.driver?.name}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>נקודת התחלה: &nbsp;</p>
                                <span>{record?.startingPoint}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>יעד נסיעה: &nbsp;</p>
                                <span>{record?.destinationPoint}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>קילמוטראז לפני הנסיעה: &nbsp;</p>
                                <span>{record?.startKm.toLocaleString('he-IL')}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>קילומטראז אחרי הנסיעה: &nbsp;</p>
                                <span>{record?.driveEndKm.toLocaleString('he-IL')}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>תאריך התחלת נסיעה: &nbsp;</p>
                                <span>{recordStartDate}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>תאריך סיום נסיעה: &nbsp;</p>
                                <span>{recordEndDate}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>רכב: &nbsp;</p>
                                <span>{record?.car?.licenseNumber}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <p>סטטוס הנסיעה: &nbsp;</p>
                                <span>{driveStatus}</span>
                            </div>
                        </li>
                    </ul>

                </div>
            </section>
        </Dialog>
    </>
}
