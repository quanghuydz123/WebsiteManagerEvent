export interface SalesSummary {
    totalTicketSoldAndtotalRevenue: TotalTicketSoldAndtotalRevenue
    typeTicketSoldAndtotalRevenue: TypeTicketSoldAndtotalRevenue[]
}

export interface TotalTicketSoldAndtotalRevenue {
    totalTicketsSold: number
    totalRevenueSold: number
    totalTicketsCheckedIn: number
    totalAmount: number
    totalRevenue: number
}

export interface TypeTicketSoldAndtotalRevenue {
    totalSold: number
    totalCheckIn: number
    priceSold: number[]
    typeTicket: TypeTicket
}

export interface TypeTicket {
    _id: string
    name: string
    price: number
    amount: number
}
