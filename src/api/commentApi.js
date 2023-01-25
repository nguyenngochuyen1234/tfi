
import axiosClient from "./axiosClient"


const commentApi ={
    createComment(idPost,data){
        const url=`/comment/${idPost}`
        return axiosClient.post(url,data)
    },
    getAllPost(idGroup){
        const url=`/post/${idGroup}`
        return axiosClient.get(url)    
    }
}
export default commentApi;