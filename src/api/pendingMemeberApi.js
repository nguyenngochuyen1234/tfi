
import axiosClient from "./axiosClient"


const pendingMemberApi = {
    getPendingMember(idGroup) {
        const url = `/pendingMember/${idGroup}`
        return axiosClient.get(url)
    },
    updatePendingMember(idGroup, idUser, type) {
        const url = `/pendingMember/${idGroup}/${idUser}`
        return axiosClient.patch(url, type)
    }
}
export default pendingMemberApi;