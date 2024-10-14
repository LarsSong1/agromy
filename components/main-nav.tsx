'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export function MainNav ({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>){ 
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Dashboard',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Cartelera',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categorias',
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Tamaños',
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Configuraciones',
            active: pathname === `/${params.storeId}/settings`,
        }
    ]
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map(route =>(
                <Link 
                    key={route.href} 
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary", 
                        route.active? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}