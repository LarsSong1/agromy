import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { name } = body

        if (!userId) {
            return new NextResponse("No tienes autorización", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Debes proporcionar un nombre", { status: 400 })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })


        return NextResponse.json(store)
    } catch (error) {
        console.log(["STORES_POST"], error)
        return new NextResponse("Error interno", { status: 500 })
    }
}