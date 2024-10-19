'use client'

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface OrderClientProps {
    data: OrderColumn[]
}


export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>

            <Heading
                title={`Ordenes ${data.length}`}
                description="Administra tus ordenes para tu tienda"
            />

            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}
