'use client'

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
    initialData: Billboard | null;
}




export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData,
}) => {
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const title = initialData ? "Edita Cartelera" : "Crear Cartelera"
    const description = initialData ? "Edita una Cartelera" : "Añade una nueva Cartelera"
    const toastMessage = initialData ? "Cartelera actualizada" : "Cartelera creada"
    const action = initialData ? "Guardar cambios" : "Crear"



    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        },
    })

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success('Tienda actualizada')
        } catch (error) {
            toast.error("Algo salio mal")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Tienda eliminada correctamente")
        } catch (error) {
            toast.error("Asegurate de remover todos los productos y categorias primero")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant={'destructive'}
                        size={'icon'}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nombre
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Nombre de la Cartelera"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>

            </Form>
            <Separator />

        </>
    )
}