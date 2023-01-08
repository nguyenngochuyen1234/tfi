
import axiosClient from "./axiosClient"

const groupApi ={
    getAllGroupUSer(){
        const url='/group/allGroupUser'
        return axiosClient.get(url)
    },
    createGroup(data){
        const url='/group'
        return axiosClient.post(url,data)
    }

}
export default groupApi;