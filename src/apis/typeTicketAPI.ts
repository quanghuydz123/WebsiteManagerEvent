import { webInfo } from "../constrants/webInfo"
import axiosClient from "./axiosClient"

class TypeTicketAPI {
    HandleTypeTicket = async (
        url:string,
        data?:any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
        return await axiosClient(`/typeTickets${url}`,{
            method: method ?? 'get',
            data
        })
    }   
}

const typeTicketAPI = new TypeTicketAPI()
export default typeTicketAPI