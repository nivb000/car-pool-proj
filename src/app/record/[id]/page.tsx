import { Record } from '@/interfaces/record'
import { getRecordById } from "@/services/server/record/record.controller"

const RecordDetails = async ({ params }: { params: { id: string } }) => {

  const record: Record = await getRecordById(params.id) 
  record._id = record._id?.toString()
  console.log(record)
   

  
  return <h4>
    {record?._id}
  </h4>
}

export default RecordDetails