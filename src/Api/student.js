import axios from '../http'
export const login = (data) => {
  return axios.post(`user/login`, data)
}

export const changePass = (passwordReq) => {
  return axios.post(`/student/password`,
    passwordReq
  )
}
export const changeInfo = (userInfoReq) => {
  return axios.post(`/student/info`,
    userInfoReq
  )
}