const demoData = require("@/services/demoData")


export async function GET() {
    let entities = demoData
    return Response.json(entities)
}
// export async function GET() {
//     const res = await fetch('https://data.mongodb-api.com/...', {
//         headers: {
//             'Content-Type': 'application/json',
//             'API-Key': process.env.DATA_API_KEY,
//         },
//     })
//     const data = await res.json()

//     return Response.json({ data })
// }