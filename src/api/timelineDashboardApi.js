
import axiosClient from "./axiosClient"


const timelineDashboardApi = {
    createTimelineDashboard(data) {
        const url = '/timelineDashboard'
        return axiosClient.post(url, data)
    },
    getTimelineDashboard() {
        const url = '/timelineDashboard'
        return axiosClient.get(url)
    },
}
export default timelineDashboardApi;