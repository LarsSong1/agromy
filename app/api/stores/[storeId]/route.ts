import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { name } = body

        if (!userId) {
            return new NextResponse('No autenticado', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Debes proporcionar un nombre', { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse('storeId es requerido', { status: 400 })
        }


        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}


export async function DELETE(
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()


        if (!userId) {
            return new NextResponse('No autenticado', { status: 401 })
        }


        if (!params.storeId) {
            return new NextResponse('storeId es requerido', { status: 400 })
        }


        const store = prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            },
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORE_DELETE]', error);

        return new NextResponse("Internal Server Error", { status: 500 })
    }
}