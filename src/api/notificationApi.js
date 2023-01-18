
import axiosClient from "./axiosClient"


const notificationApi = {
    createNotification(data) {
        const url = '/notification'
        return axiosClient.post(url, data)
    },
    getNotification(idNotif) {
        const url = `/notification/find/${idNotif}`
        return axiosClient.get(url)
    },
    updateNotification(idNotif, newData) {
        const url = `/notification/${idNotif}`
        return axiosClient.patch(url, newData)
    },
    getAllNotification() {
        const url = "/notification"
        return axiosClient.get(url)

    }
}
export default notificationApi;