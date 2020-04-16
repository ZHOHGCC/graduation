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
//-------------------获取任务
export const getTask = (params) => {
  return axios.get(`/student/task`, {
    params
  })
}
//-------------------初次提交论文
export const sendThesis = (thesisReq) => {
  return axios.post(`/student/thesis`,
    thesisReq
  )
}

export const changeThesis = (thesisReq) => {
  return axios.put(`/student/thesis`,
    thesisReq
  )
}
// ------------------查看论文

export const getThesis = (params) => {
  return axios.get(`/student/thesis`, {
    params
  })
}

///  获得评价 
export const getAppraise = (id) => {
  return axios.get(`/student/appraise/${id}`, {
    params: {
      type: 2
    }
  })
}