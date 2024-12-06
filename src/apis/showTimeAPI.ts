import { webInfo } from "../constrants/webInfo"
import axiosClient from "./axiosClient"

class ShowTimeAPI {
    HandleShowTime = async (
        url:string,
        data?:any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
        return await axiosClient(`/showTimes${url}`,{
            method: method ?? 'get',
            data
        })
    }   
}

const showTimeAPI = new ShowTimeAPI()
export default showTimeAPI