import axios from "axios";
import queryString from "query-string";
import { webInfo } from "../constrants/webInfo"

// const getAccessToken = async () =>{
//     const res = await AsyncStorage.getItem('auth')
//     return res ? JSON.parse(res).accesstoken : ''
// }
const axiosClient = axios.create({
    baseURL:webInfo.BASE_URL,
    paramsSerializer: params => queryString.stringify(params)
})


axiosClient.interceptors.request.use(async (config:any)=>
{
    // const accessToken = await getAccessToken()
    config.headers = {
        Authorization : '',
        Accept: 'application/json',
        ...config.headers
    }

    config.data

    return config
})


axiosClient.interceptors.response.use(res => {
    if(res.data && res.status === 200){
        return res.data
    }
    throw new Error('Lỗi rồi')
}, error =>{
    console.log(`Error api: " ${JSON.stringify(error)}}`)
    const messageError = {
        message:error.response.data.message,
        statusCode:error.response.data.status
    }
    throw new Error(JSON.stringify(messageError))
})


export default axiosClient
