

import axiosClient from "./axiosClient"


const exerciseApi = {
    submitExecrcise(idTask, data) {
        const url = `/exercise/${idTask}`
        return axiosClient.post(url, data)
    },
    getAllPost(idGroup) {
        const url = `/post/${idGroup}`
        return axiosClient.get(url)
    }
}
export default exerciseApi;