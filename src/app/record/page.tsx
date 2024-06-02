import { Record } from '@/interfaces/record'
import { RecordTable } from '@/cmps/record-table'

// TODO:MUI TABLE

async function getRecords() {
  const res = await fetch('http://localhost:3000/api/record')
  return res.json()
}

const RecordApp = async () => {

  const { entities: records }: { entities: Record[] } = await getRecords() || []


  return <section className='record-app'>
    <div className='gradient-overlay'>
      <div className='main-layout'>
      </div>
    </div>
    <section className='main-layout flex main-container'>
      <div className='left'>
      </div>
      <div className='right'>
        <RecordTable />
        <div>{records.map(record => <div key={record._id}>{record.startingKm}</div>)}</div>
      </div>
    </section>
  </section>
}

export default RecordApp