"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import  axios  from "axios"
import { toast } from "sonner"



const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal()


    const [loading, setLoading] = useState(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Create Store
        try {
            setLoading(true)
            const response = await axios.post('/api/stores', values)
            // toast.success("Tienda creada exitosamente")

            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Algo salío mal")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Crear Tienda"
            description="Añade una nueva tienda para administrar productos y categorias"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nombre
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-commerce"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />


                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    type="button"
                                    disabled={loading}
                                    variant={'outline'}
                                    onClick={storeModal.onClose}

                                >
                                    Cancelar
                                </Button>
                                <Button
                                    disabled={loading}
                                    type="submit">
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}