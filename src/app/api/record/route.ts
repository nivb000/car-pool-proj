import { query, getById, remove, update, add, getByLicense } from "@/services/server/record/record.service"

export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (id) {
        try {
            let record = await getById(id)
            return Response.json({ record })
        } catch (error) {
            return Response.json({ status: 404, statusText: "Cannot get record" })
        }
    } else {
        try {
            const records = await getByLicense(searchParams.get('licenseNumber'))
            return Response.json({ records })
        } catch (error) {
            return Response.json({ status: 404, statusText: "Cannot get records" })
        }
    }
}


export async function POST(req: Request) {
    const newRecord = await req.json()
    const res = await add(newRecord)
    return Response.json({ res })
}


export async function PUT(req: Request) {
    const updatedRecord = await req.json()
    const res = await update(updatedRecord)
    return Response.json({ res })
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const res = await remove(id)
    return Response.json({ res })
}