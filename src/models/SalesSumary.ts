import { PromotionModel } from './TypeTicketModel';

export interface SalesSummary {
  totalTicketSoldAndtotalRevenue: TotalTicketSoldAndtotalRevenue;
  typeTicketSoldAndtotalRevenue: TypeTicketSoldAndtotalRevenue[];
}

export interface TotalTicketSoldAndtotalRevenue {
  totalTicketsSold: number;
  totalRevenueSold: number;
  totalTicketsCheckedIn: number;
  totalAmount: number;
  totalRevenue: number;
}

export interface TypeTicketSoldAndtotalRevenue {
  totalSold: number;
  totalCheckIn: number;
  priceSold: number[];
  typeTicket: TypeTicket;
  promotion: PromotionModel;
}

export interface TypeTicket {
  _id: string;
  name: string;
  price: number;
  amount: number;
}
