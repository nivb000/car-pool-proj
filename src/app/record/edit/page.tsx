'use client'
import { useState } from "react"
import TextField from '@mui/material/TextField';

const RecordEdit = () => {

    const [record, setRecord] = useState({
        startingKm: 0,
        driveEndKm: 0,
        date: 1717492044,
        destinationPoint: "",
        startingPoint: "",
        car: 11111111
    })

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const name = target.name
        let value: any
        switch (name) {
            case 'startingKm':
            case 'driveEndKm':
                value = +target.value
                break;
            default:
                value = target.value
                break
        }
        setRecord(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        console.log(record)
        
    }

    return <section className="record-edit">
        <form className="flex col align-center space-between" onSubmit={handleSubmit}>
            <div className="input-field">
                    {/* <input type="text" name="startingPoint" onChange={handleChange} /> */}
                    <TextField id="outlined-basic" size="small" label="נקודת מוצא" variant="outlined" type="text" name="startingPoint" onChange={handleChange} />
            </div>
            <div className="input-field">
                    {/* <input type="text" name="destinationPoint" onChange={handleChange} /> */}
                    <TextField id="outlined-basic" size="small" label="יעד" variant="outlined" type="text" name="destinationPoint" onChange={handleChange} />
                
            </div>
            <div className="input-field">             
                    {/* <input type="number" defaultValue={125} name="startingKm" onChange={handleChange} /> */}
                    <TextField id="outlined-basic" size="small" label="קילומטר תחילת נסיעה" variant="outlined" type="number" defaultValue={125} name="startingKm" onChange={handleChange} />
                
            </div>
            <div className="input-field">
                    {/* <input type="number" name="driveEndKm" onChange={handleChange} /> */}
                    <TextField id="outlined-basic" size="small" label="קילומטר סוף נסיעה" variant="outlined" type="number" name="driveEndKm" onChange={handleChange} />
               
            </div>
            <button type="submit">Submit</button>
        </form>

    </section>
}

export default RecordEdit