
import axiosClient from "./axiosClient"


const messageApi ={
    createMessage(data){
        const url='/message'
        return axiosClient.post(url,data)
    },
    getMessage(idFriend){
        const url = `/message/find/${idFriend}`
        return axiosClient.get(url)
    }
}
export default messageApi;