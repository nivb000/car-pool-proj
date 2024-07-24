import { Record } from '@/interfaces/record'
import { getRecordById } from "@/services/server/record/record.controller"

const RecordDetails = async ({ params }: { params: { id: string } }) => {

  console.log(params)
  

  const record: Record = await getRecordById(params.id) 
  record._id = record._id?.toString() 

  
  return <h4>
    {record?._id}
  </h4>
}

export default RecordDetails