
import axiosClient from "./axiosClient"


const delFirebaseApi = {
    deleteFile(link){
        const url="/delete"
        return axiosClient.post(url,{link})
    }
}
export default delFirebaseApi;