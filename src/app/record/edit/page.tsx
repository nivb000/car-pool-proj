import Image from "next/image"
import carOrder from "@/assets/imgs/order-car.png"


const handleSubmit = async(formData: FormData) => {
    "use server"
    console.log(formData)
    
    
}

const RecordEdit = () => {


    return <section className="flex space-evenly record-edit">
        <section className="form-container flex col align-center">
            <div className="wrapper">
                <h1>הוסף נסיעה חדשה</h1>
                <form className="flex col space-between" autoComplete="off" action={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="startingPoint"></label>
                        <input type="text" name="startingPoint" id="startingPoint" placeholder="נקודת מוצא" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="destinationPoint"></label>
                        <input type="text" name="destinationPoint" id="destinationPoint" placeholder="נקודת יעד" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="startingKm"></label>
                        <input type="number" defaultValue={125} name="startingKm" id="destinationPoint" placeholder="קילומטר תחילת נסיעה" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="destinationPoint"></label>
                        <input type="number" name="driveEndKm" id="destinationPoint" placeholder="קילומטר סוף נסיעה" />
                    </div>
                    <div className="input-field">
                        <button type="submit">
                            הוסף נסיעה
                        </button>
                    </div>
                </form>
            </div>
        </section>
        <section className="left-section">
            <div className="image-container">
                <Image src={carOrder} width={500} height={500} alt='blue-car-image' />
            </div>
        </section>

    </section>
}

export default RecordEdit












// import { useState } from "react"
// import { Button } from "@mui/material"
// import Image from "next/image"
// import carOrder from "@/assets/imgs/order-car.png"
// import { httpService } from '@/services/http.service'

// const RecordEdit = () => {

//     const [record, setRecord] = useState({
//         startingKm: 0,
//         driveEndKm: 0,
//         date: new Date().getTime(),
//         destinationPoint: "",
//         startingPoint: "",
//         car: 11111111
//     })

//     const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        
//         const name = target.name
//         let value: any
//         switch (name) {
//             case 'startingKm':
//             case 'driveEndKm':
//                 value = +target.value
//                 break;
//             default:
//                 value = target.value
//                 break
//         }
//         setRecord(prevState => ({ ...prevState, [name]: value }))
//     }

//     const handleSubmit = async (ev: React.FormEvent) => {
//         ev.preventDefault()
//         const newRecord = await httpService.post('record', record)
//         console.log(newRecord)
//     }

//     return <section className="flex space-evenly record-edit">
//         <section className="form-container flex col align-center">
//             <div className="wrapper">
//                 <h1>הוסף נסיעה חדשה</h1>
//                 <form className="flex col space-between" autoComplete="off" onSubmit={handleSubmit}>
//                     <div className="input-field">
//                         <label htmlFor="startingPoint"></label>
//                         <input type="text" name="startingPoint" id="startingPoint" placeholder="נקודת מוצא" onChange={handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="destinationPoint"></label>
//                         <input type="text" name="destinationPoint" id="destinationPoint" placeholder="נקודת יעד" onChange={handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="startingKm"></label>
//                         <input type="number" defaultValue={125} name="startingKm" id="destinationPoint" placeholder="קילומטר תחילת נסיעה" onChange={handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="destinationPoint"></label>
//                         <input type="number" name="driveEndKm" id="destinationPoint" placeholder="קילומטר סוף נסיעה" onChange={handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <Button variant="contained" color="success" fullWidth type="submit">
//                             הוסף נסיעה
//                         </Button>
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