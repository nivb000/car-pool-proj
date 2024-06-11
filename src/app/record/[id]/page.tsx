import { Record } from '@/interfaces/record'

async function getRecord(recordId: string) {
  const res = await fetch(`http://localhost:3000/api/record?id=${recordId}`, { cache: 'no-store' })
  return res.json()
}

const RecordDetails = async ({ params }: { params: { id: string } }) => {

  const { record }: { record: Record } = await getRecord(params.id)

  
  return <pre>
    {record?._id}
  </pre>
}

export default RecordDetails