import { getRecords, getRecordById } from "@/services/server/record/record.controller"

export async function GET(req: Request) {

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

    let records = await getRecords()
    return Response.json({ records })
}