
import axiosClient from "./axiosClient"

const groupApi ={
    getAllGroupUser(){
        const url='/group/allGroupUser'
        return axiosClient.get(url)
    },
    createGroup(data){
        const url='/group'
        return axiosClient.post(url,data)
    },
    updateGroup(id,data){
        const url=`/group/${id}`
        return axiosClient.put(url,data)
    },
    delGroup(id){
        const url=`/group/${id}`
        return axiosClient.delete(url)
    }
}
export default groupApi;