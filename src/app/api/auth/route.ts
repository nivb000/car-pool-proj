import { deleteSession, getUser } from "@/services/server/auth/session.service"


export async function GET() {
    try {
        const user = await getUser()
        return Response.json(user)
    } catch (error) {
        Response.error()
    }

}
export async function POST(req: Request) {
    console.log("IM HERE ON POST")

}

export async function DELETE() {
    deleteSession()
    return Response.json({ success: true })
}