
import axiosClient from "./axiosClient"


const conversatioApi ={
    createConversation(data){
        const url='/conversation'
        return axiosClient.post(url,data)
    },
    getFriendData(){
        const url = '/conversation'
        return axiosClient.get(url)
    },
    getConversationFromFriendId(idFriend){
        const url = `/conversation/find/${idFriend}`
        return axiosClient.get(url)

    }
}
export default conversatioApi;