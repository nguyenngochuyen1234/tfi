
import axiosClient from "./axiosClient"

const groupApi ={
    getAllGroupMade(){
        const url='/group/groupMade'
        return axiosClient.get(url)
    },
    getAllGroupJoined(){
        const url='/group/groupJoined'
        return axiosClient.get(url)
    },
    createGroup(data){
        const url='/group'
        return axiosClient.post(url,data)
    }

}
export default groupApi;