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
        const { name, billboardId } = body

        if (!userId) {
            return new NextResponse("No estas autenticado", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Debes proporcionar un nombre", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("Debes proporcionar un Id de una Cartelera", { status: 400 })
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })


        return NextResponse.json(category)
    } catch (error) {
        console.log(["CATEGORIES_POST"], error)
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

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        })


        return NextResponse.json(categories)
    } catch (error) {
        console.log(["BILBOARDS_GET"], error)
        return new NextResponse("Error interno", { status: 500 })
    }
}