import axios from '../http'
export const login = (data) => {
  return axios.post(`user/login`, data)
}
export const sendFile = (formData) => {
  return axios.post(`/file/upload`,
    formData
  )
}