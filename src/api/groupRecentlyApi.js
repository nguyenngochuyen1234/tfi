
import axiosClient from "./axiosClient"


const groupRecentlyApi = {
    updateTimeGroup(idGroup) {
        const url = `/groupRecently/${idGroup}`
        return axiosClient.patch(url)
    },
    getGroupRecently() {
        const url = '/groupRecently'
        return axiosClient.get(url)
    }
}
export default groupRecentlyApi;