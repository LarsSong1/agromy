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
        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse("No estas autenticado", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Debes proporcionar un nombre", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Debes proporcionar una imagen", { status: 400 })
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })


        return NextResponse.json(billboard)
    } catch (error) {
        console.log(["BILBOARDS_POST"], error)
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

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })


        return NextResponse.json(billboards)
    } catch (error) {
        console.log(["BILBOARDS_GET"], error)
        return new NextResponse("Error interno", { status: 500 })
    }
}