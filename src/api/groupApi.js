
import axiosClient from "./axiosClient"

const groupApi ={
    getAllGroupUser(){
        const url='/group/allGroupUser'
        return axiosClient.get(url)
    },
    getOnlyGroup(idGroup){
        const url=`/group/find/${idGroup}`
        return axiosClient.get(url)
    }
    createGroup(data){
        const url='/group'
        return axiosClient.post(url,data)
    },
    delGroup(id){
        const url='/group'
        return axiosClient.delete(url+'/'+id)
    }
}
export default groupApi;