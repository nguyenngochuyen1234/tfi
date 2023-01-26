
import axiosClient from "./axiosClient"


const reactApi = {
    createReact(idPost) {
        const url = `/react/${idPost}`
        return axiosClient.post(url)
    },
    deleteReact(idPost) {
        const url = `/react/${idPost}`
        return axiosClient.delete(url)
    }
}
export default reactApi;