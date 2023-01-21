
import axiosClient from "./axiosClient"

const taskApi ={
    createTask(idGroup,data){
        const url=`/task/${idGroup}`
        return axiosClient.post(url,data)
    },
    getAllTask(idGroup){
        const url=`/task/${idGroup}`
        return axiosClient.get(url)
    },
    getOnlyTask(idTask){
        const url=`/task/find/${idTask}`
        return axiosClient.get(url)
    },
    updateTask(idTask, newData){
        const url=`/task/${idTask}`
        return axiosClient.put(url,newData)
    },
    deleteTask(idTask){
        const url=`/task/${idTask}`
        return axiosClient.delete(url)
    }
}
export default taskApi;