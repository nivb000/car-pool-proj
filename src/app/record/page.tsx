import { Record } from '@/interfaces/record'
import { RecordTable } from '@/cmps/record-table'
import { Suspense } from 'react'
import Image from 'next/image'
import car from '../../assets/imgs/car.jpg'


async function getRecords() {
  const res = await fetch('http://localhost:3000/api/record', { cache: 'no-store' })
  return res.json()
}

const RecordApp = async () => {
  
  const { records }: { records: Record[] } = await getRecords() || []
  



  return <Suspense fallback={<div>Loading...</div>}>
    <section className='record-app'>
      <div className='gradient-overlay'>
        <div className='main-layout'>
        </div>
      </div>
      <section className='main-layout flex main-container'>
        <div className='left'>
          <Image src={car} width={300} height={300} alt='blue-car-image' />
        </div>
        <div className='flex col right'>
          <RecordTable records={records} />
        </div>
      </section>
    </section>
  </Suspense>
}

export default RecordApp