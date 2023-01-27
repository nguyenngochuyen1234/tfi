

import axiosClient from "./axiosClient"


const exerciseApi = {
    submitExecrcise(idTask, data) {
        const url = `/exercise/${idTask}`
        return axiosClient.post(url, data)
    },

}
export default exerciseApi;