
import axiosClient from "./axiosClient"

const imageApi ={
    getSingleImage(data){
        const url='/image/singleImage'
        return axiosClient.post(url,data)
    },
    getGroupImage(data){
        const url='/image/groupImage'
        return axiosClient.post(url,data)
    },
}
export default imageApi;