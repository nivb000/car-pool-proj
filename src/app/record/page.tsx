import { getRecords } from "@/services/server/record/record.controller"
import { RecordTable } from '../(cmps)/record-table'
import Image from 'next/image'
import car from '../../assets/imgs/car.jpg'
import { Record } from "@/interfaces/record"
import { getUser } from "@/services/server/auth/session.service"

const RecordApp = async () => {  

  let data: Record[] = await getRecords()
  data = JSON.parse(JSON.stringify(data))

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
          <RecordTable records={data} />
      </div>
    </section>
  </section>
}

export default RecordApp