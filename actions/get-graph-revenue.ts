import prismadb from "@/lib/prismadb";


interface GraphData {
    name: string, 
    total: number
}

export const getGraphRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })


    const montlyRevenue: {[key: number]: number} = {}
    

    for (const order of paidOrders){
        const month = order.createdAt.getMonth()
        let revenueForOrder = 0
        

        for (const item of order.orderItems){
            revenueForOrder += item.product.price.toNumber()
        }


        montlyRevenue[month] = (montlyRevenue[month] || 0) + revenueForOrder
    }



    const graphData: GraphData[] = [
        {name: "Enero", total: 0},
        {name: "Febrero", total: 0},
        {name: "Marzo", total: 0},
        {name: "Abril", total: 0},
        {name: "Mayo", total: 0},
        {name: "Junio", total: 0},
        {name: "Julio", total: 0},
        {name: "Agosto", total: 0},
        {name: "Septiembre", total: 0},
        {name: "Octubre", total: 0},
        {name: "Noviembre", total: 0},
        {name: "Diciembre", total: 0},
    ]

    for (const month in montlyRevenue){
        graphData[parseInt(month)].total = montlyRevenue[parseInt(month)]
    }


    return graphData
}