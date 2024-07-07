import { Record } from '@/interfaces/record'
import { getRecordById, addRecord } from "@/services/server/record/record.controller"

const RecordDetails = async ({ params }: { params: { id: string } }) => {

  const { record }: { record: Record } = await getRecordById(params.id)

  
  return <pre>
    {record?._id}
  </pre>
}

export default RecordDetails