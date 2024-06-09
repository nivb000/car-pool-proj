const demoData = require("@/services/demoData")
const recordController = require("@/services/server/record/record.controller")

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
        let record = await recordController.getRecordById(id)
        return Response.json({ record })
    }

    let records = await recordController.getRecords()
    return Response.json({ records })
}
// export async function GET BY ID(req: Request) {
// const { searchParams } = new URL(request.url)
// const id = searchParams.get('id')
//     const res = await fetch('https://data.mongodb-api.com/...', {
//         headers: {
//             'Content-Type': 'application/json',
//             'API-Key': process.env.DATA_API_KEY,
//         },
//     })
//     const data = await res.json()

//     return Response.json({ data })
// }