
import axiosClient from "./axiosClient"

const userApi = {
    register(data) {
        const url = '/auth/register'
        return axiosClient.post(url, data)
    },
    updateAccount(account){
        const url = '/auth/register/add'
        return axiosClient.post(url, account)    
    },
    login(data) {
        const url = '/auth/login'
        return axiosClient.post(url, data)
    },
    getAllUser() {
        const url='/auth/allAccount'
        return axiosClient.get(url)
    },
    getOnlyUser(id) {
        const url = `/auth/find/${id}`
        return axiosClient.get(url)
    }
}
export default userApi;