import { getById } from "@/services/server/car/car.service"

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
        try {
            let car = await getById(id)
            return Response.json({ car })
        } catch (error) {
            return Response.json({ status: 404, statusText: "Cannot get car" })
        }
    }
}
