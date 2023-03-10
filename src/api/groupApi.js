
import axiosClient from "./axiosClient"

const groupApi = {
    getAllGroupUser() {
        const url = '/group/allGroupUser'
        return axiosClient.get(url)
    },
    joinGroupWithCode(idGroup) {
        const url = `group/join/${idGroup}`
        return axiosClient.post(url)
    },
    getOnlyGroup(idGroup) {
        const url = `/group/find/${idGroup}`
        return axiosClient.get(url)
    },
    getUsersByIds(idGroup) {
        const url = `/group/findUsers/${idGroup}`
        return axiosClient.get(url)
    },
    createGroup(data) {
        const url = '/group'
        return axiosClient.post(url, data)
    },
    updateGroup(id, data) {
        const url = `/group/${id}`
        return axiosClient.patch(url, data)
    },
    delGroup(id) {
        const url = `/group/${id}`
        return axiosClient.delete(url)
    }
}
export default groupApi;