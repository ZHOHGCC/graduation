import axios from '../http'
export const getStudent = (params) => {
    return axios.get(`students`, {
        params
    })
}