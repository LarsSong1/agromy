"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"


export const StoreModal = () => {
    const storeModal = useStoreModal()
    return (
        <Modal
            title="Crear Tienda"
            description="Añade una nueva tienda para administrar productos y categorias"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future Create Store Form
        </Modal>
    )
}