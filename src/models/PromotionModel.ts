export interface PromotionModel {
    _id: string
    title: string
    discountType: 'FixedAmount'| 'Percentage'
    discountValue: number
    startDate: string
    endDate: string
    event: string
    status: 'NotStarted' | 'Ongoing' | 'Ended' | 'Canceled'
    createdAt: string
    updatedAt: string
    __v: number
    typeTickets: string[]
  }
  