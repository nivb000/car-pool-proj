"use client"
import React from 'react'
import Image from 'next/image'
import { recordService } from '../../services/record.service.local'


async function getRecords() {
    const res = await recordService.query()
    return res
    
}


const RecordApp = async () => {


  const records = await getRecords()

  return <section className='record-app'>
    <div className='gradient-overlay'>
      <div className='main-layout'>
      </div>
    </div>
    <section className='main-layout flex main-container'>
      <div className='left'></div>
      <div className='right'></div>
    </section>
  </section>
}

export default RecordApp