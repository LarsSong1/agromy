'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SizeColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"


interface CellActionProps {
    data: SizeColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("ID del Tamaño copiado correctamente")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            console.log(params.billboardId)
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh()
            toast.success("Tamaño Eliminado")
        } catch (error) {
            toast.error("Asegurate de remover todos los productos usando este tamaño primero")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }


    return (


        <>
            <AlertModal 
                isOpen={open}
                onClose={()=>setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="w-8 h-8 p-0">
                        <span className="sr-only">Abrir Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Acciones
                        <DropdownMenuItem onClick={() => onCopy(data.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar Id
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>setOpen(true)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}