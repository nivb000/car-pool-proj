import { getRecords, getRecordById, addRecord } from "@/services/server/record/record.controller"

export async function GET(req: Request) {

    const records = await getRecords()
    return Response.json({ records })
}


export async function POST(req: Request) {
    const newRecord = await addRecord(req)
    return Response.json({ newRecord })
}




    // To GET one record By ID
    // const { searchParams } = new URL(req.url)
    // const id = searchParams.get('id')

    // if (id) {
    //     try {
    //         let record = await getRecordById(id)
    //         return Response.json({ record })
    //     } catch (error) {
    //         return Response.json({ status: 404, statusText: "Cannot get record" })
    //     }
    // }