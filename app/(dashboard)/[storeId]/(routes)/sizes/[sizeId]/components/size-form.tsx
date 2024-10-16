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
import { Size} from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData: Size | null;
}




export const SizeForm: React.FC<SizeFormProps> = ({
    initialData,
}) => {
    const params = useParams()
    const router = useRouter()


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const title = initialData ? "Edita Tamaño" : "Crear Tamaño"
    const description = initialData ? "Edita un Tamaño" : "Añade un nuevo Tamaño"
    const toastMessage = initialData ? "Tamaño actualizado" : "Tamaño creado"
    const action = initialData ? "Guardar cambios" : "Crear"



    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        },
    })

    

    const onSubmit = async (data: SizeFormValues) => {
        console.log(data)
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Algo salio mal")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            console.log(params.billboardId)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success("Tamaño Eliminado")
        } catch (error) {
            toast.error("Asegurate de remover todos los productos usando esta tamaño primero")
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="label">
                                        Nombre
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="label"
                                            disabled={loading}
                                            placeholder="Nombre del Tamaño"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="label">
                                        Valor
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="label"
                                            disabled={loading}
                                            placeholder="Valor del Tamaño"
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
          

        </>
    )
}