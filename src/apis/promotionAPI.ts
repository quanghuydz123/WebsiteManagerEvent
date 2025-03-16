import { webInfo } from "../constrants/webInfo"
import axiosClient from "./axiosClient"

class PromotionAPI {
    HandlePromotion = async (
        url:string,
        data?:any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
        return await axiosClient(`/promotions${url}`,{
            method: method ?? 'get',
            data
        })
    }
}

const promotionAPI = new PromotionAPI()
export default promotionAPI