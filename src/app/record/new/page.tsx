'use client'
import { useState } from "react"

const AddNewRecord = () => {

    const [record, setRecord] = useState({
        startingKm: 0,
        driveEndKm: 0,
        date: 1717492044,
        destinationPoint: "",
        startingPoint: "",
        car: 11111111
    })

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const name = ev.target.name
        const value = ev.target.value
        setRecord(prevState => ({...prevState, [name]: value}))
    }

    const handleSubmit = () => {
        console.log("NEW RECORD", record)
        
    }

    return <section>
        <form>
            <input type="number" name="startingKm" />
            <input type="number" name="driveEndKm" />
            <button onClick={() => handleSubmit}>Submit</button>
        </form>

    </section>
}

export default AddNewRecord