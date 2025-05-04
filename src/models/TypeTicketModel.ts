export interface TypeTicketModel {
  _id: string;
  name: string;
  amount?: number;
  description: string;
  type: 'Free' | 'Paid';
  price: number;
  startSaleTime: Date;
  endSaleTime: Date;
  promotion?: PromotionModel;

  status: 'NotStarted' | 'OnSale' | 'Ended' | 'SoldOut' | 'Canceled';
}

export interface PromotionModel {
  _id: string;
  title: string;
  discountType: 'FixedAmount' | 'Percentage';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  status: 'NotStarted' | 'Ongoing' | 'Ended' | 'Canceled';
}
export const initTypeTicket = {
  _id: '',
  description: '',
  endSaleTime: new Date(),
  status: 'OnSale',
  type: 'Paid',
  name: '',
  price: 0,
  startSaleTime: new Date(),
  amount: 0,
} as const;
