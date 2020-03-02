import axios from '../http'
export const getStudent = (params) => {
  return axios.get(`/tutor/students`, {
    params
  })
}
export const changeInfo = (userInfoReq) => {
  return axios.post(`/tutor/info`,
    userInfoReq
  )
}
export const changePass = (passwordReq) => {
  return axios.post(`/tutor/password`,
    passwordReq
  )
}
//---------------------发布任务
export const sendTask = (taskReq) => {
  return axios.post(`/tutor/task`,
    taskReq
  )
}