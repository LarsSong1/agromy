import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { useParams } from "next/navigation"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { name, value } = body

        if (!userId) {
            return new NextResponse("No estas autenticado", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Debes proporcionar un nombre", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Debes proporcionar un Valor", { status: 400 })
        }


        if (!params.storeId) {
            return new NextResponse("Id de la tienda es requerido", { status: 400 })
        }


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("No tienes permisos para esta tienda", { status: 403 })
        }

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })


        return NextResponse.json(color)
    } catch (error) {
        console.log(["COLORS_POST"], error)
        return new NextResponse("Error interno", { status: 500 })
    }
}



export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Id de la tienda es requerido", { status: 400 })
        }

        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            }
        })


        return NextResponse.json(colors)
    } catch (error) {
        console.log(["COLORS_GET"], error)
        return new NextResponse("Error interno", { status: 500 })
    }
}