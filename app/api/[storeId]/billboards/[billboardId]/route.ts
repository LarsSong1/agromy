import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
       

        if (!params.billboardId) {
            return new NextResponse('Id de cartelera es requerido', { status: 400 })
        }

       


        const billboard = await prismadb.billboard.findMany({
            where: {
                id: params.billboardId,
                
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_GET]', error);

        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse('No autenticado', { status: 401 })
        }

        if (!label) {
            return new NextResponse('Debes proporcionar un nombre', { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse('Debes proporcionar una Imagen', { status: 400 })
        }

        if (!params.billboardId) {
            return new NextResponse('ID de Cartelera es requerido', { status: 400 })
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
                
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth()


        if (!userId) {
            return new NextResponse('No autenticado', { status: 401 })
        }


        if (!params.billboardId) {
            return new NextResponse('Id de cartelera es requerido', { status: 400 })
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


        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
                
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);

        return new NextResponse("Internal Server Error", { status: 500 })
    }
}