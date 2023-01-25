
import axiosClient from "./axiosClient"


const postApi ={
    createPost(idGroup,data){
        const url=`/post/${idGroup}`
        return axiosClient.post(url,data)
    },
    getAllPost(idGroup){
        const url=`/post/${idGroup}`
        return axiosClient.get(url)    
    }
}
export default postApi;