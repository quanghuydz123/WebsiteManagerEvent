import { TypeTicketModel } from "./TypeTicketModel"

export interface ShowTimeModel {
    _id: string
    startDate:Date,
    endDate:Date,
    typeTickets:TypeTicketModel[] | [],
    status:'NotStarted' | 'Ongoing' | 'Ended' | 'SoldOut' | 'OnSale'| 'SaleStopped' | 'NotYetOnSale' | 'Canceled',
    isOpen?:boolean
    errorMessage?:string
}

export const initShowTime = {
    _id:'',
    startDate:new Date(),
    endDate:new Date(),
    typeTickets:[] as TypeTicketModel[],
    status:'NotStarted',
} as const