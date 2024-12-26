import { getByDriverId, query as getRecords, remove } from "@/services/server/record/record.service"
import { RecordTable } from "../(cmps)/record-table"
import Image from 'next/image'
import car from '../../assets/imgs/car.jpg'
import { Record } from "@/interfaces/record"
import { getUser, verifySession } from "@/services/server/auth/session.service"
import { redirect } from "next/navigation"
import { User } from "@/interfaces/user"

const RecordApp = async () => {

  const session = await verifySession()
  if (!session.isAuth) {
    redirect("/")
  }

  const user: User = await getUser()

  let data: Record[] = await getByDriverId(user._id)
  data = JSON.parse(JSON.stringify(data))

  const handleDeleteRecord = async (recordId: string) => {
    "use server"
    await remove(recordId) 
  }




  return <section className='record-app'>
    <div className='gradient-overlay'>
      <div className='main-layout'>
      </div>
    </div>
    <section className='main-layout flex main-container'>
      <div className='left'>
        <Image src={car} width={300} height={300} alt='blue-car-image' />
      </div>
      <div className='flex col right'>
        <RecordTable user={user} initialRecords={data} handleDeleteRecord={handleDeleteRecord} />
      </div>
    </section>
  </section>
}

export default RecordApp