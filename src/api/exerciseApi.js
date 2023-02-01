

import axiosClient from "./axiosClient"


const exerciseApi = {
    submitExecrcise(idTask, data) {
        const url = `/exercise/${idTask}`
        return axiosClient.post(url, data)
    },
    delExecrcise(idEx) {
        const url = `/exercise/${idEx}`
        return axiosClient.delete(url)
    }

}
export default exerciseApi;