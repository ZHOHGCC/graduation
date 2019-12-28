import axios from '../http'
export const login = (data) => {
    return axios.post(`user/login`, data)
}