"use client"

import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Productos",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "address",
    header: "Direccion",
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
  },
  {
    accessorKey: "isPaid",
    header: "Estado de Pago",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },


]
