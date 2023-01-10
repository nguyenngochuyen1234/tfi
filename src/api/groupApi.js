
import axiosClient from "./axiosClient"

const groupApi ={
    getAllGroupUser(){
        const url='/group/allGroupUser'
        return axiosClient.get(url)
    },
    createGroup(data){
        const url='/group'
        return axiosClient.post(url,data)
    }

}
export default groupApi;