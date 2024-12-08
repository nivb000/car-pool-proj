import { getRecords, getRecordById, addRecord, removeRecord, updateRecord } from "@/services/server/record/record.controller"

export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (id) {
        try {
            let record = await getRecordById(id)
            return Response.json({ record })
        } catch (error) {
            return Response.json({ status: 404, statusText: "Cannot get record" })
        }
    } else {
        try {
            const records = await getRecords()
            return Response.json({ records })
        } catch (error) {
            return Response.json({ status: 404, statusText: "Cannot get records" })
        }
    }
}


export async function POST(req: Request) {
    const newRecord = await addRecord(req)
    return Response.json({ newRecord })
}


export async function PUT(req: Request) {
    const updatedRecord = await updateRecord(req)
    return Response.json({ updatedRecord })
}

export async function DELETE(req: Request) {
    const deletedRecord = await removeRecord(req)

    return Response.json({ "id": deletedRecord })
}