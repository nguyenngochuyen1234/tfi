

import axiosClient from "./axiosClient"


const exerciseApi = {
    submitExecrcise(idTask, data) {
        const url = `/exercise/${idTask}`
        return axiosClient.post(url, data)
    },
    deleteExercise(idExercise) {
        const url = `/exercise/${idExercise}`
        return axiosClient.delete(url)

    }

}
export default exerciseApi;