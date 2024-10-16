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
import ImageUpload from "@/components/ui/image-upload";

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
        console.log(data)
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.push(`/${params.storeId}/billboards`)
            router.refresh()
            toast.success("Cartelera Eliminada")
        } catch (error) {
            toast.error("Asegurate de remover todos los categorias usando esta cartelera primero")
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Imagen de la Cartelera
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="label">
                                        Nombre
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="label"
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
          

        </>
    )
}