'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"


interface CellActionProps {
    data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("ID de cartelera copiado correctamente")
    }
    return (

        
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="w-8 h-8 p-0">
                        <span className="sr-only">Abrir Menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                            Acciones
                        <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                            <Copy className="mr-2 h-4 w-4"/>
                            Copiar Id
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4"/>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4"/>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}