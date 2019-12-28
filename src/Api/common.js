import axios from '../http'
export const login = (param) => {
    return axios.post(`user/login?type=${param.type}&account=${param.account}&password=${param.password}`)
}