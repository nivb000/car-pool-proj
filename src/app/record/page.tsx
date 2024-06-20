'use client'
import useSWR from 'swr'
import { RecordTable } from '@/cmps/record-table'
import Image from 'next/image'
import car from '../../assets/imgs/car.jpg'
import { fetcher } from '../../lib/fetcher'
import { Loader } from '@/cmps/loader'

const RecordApp = () => {

  const { data, error, isLoading } = useSWR('/api/record', fetcher)


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
        {isLoading ?
          <Loader />
          :
          <RecordTable records={data?.records} />
        }
      </div>
    </section>
  </section>
}

export default RecordApp