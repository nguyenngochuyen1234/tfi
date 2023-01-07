
import axiosClient from "./axiosClient"

const userApi ={
    register(data){
        const url='/auth/register'
        return axiosClient.post(url,data)
    },
    login(data){
        const url='/auth/login'
        return axiosClient.post(url,data)
    },
    getAllUser(){
        const url='/auth/allAccount'
        return axiosClient.get(url)
    }
}
export default userApi;