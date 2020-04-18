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
//------------------------获取所有任务
export const getTask = (params) => {
  return axios.get(`/tutor/task`, {
    params
  })
}
//-------------------------获得单个任务细节
export const getDetail = (id) => {
  return axios.get(`/tutor/task/${id}`, {
    params: {
      pageNum: 1,
      pageSize: 100
    }
  })
}
// ----------------------删除任务
export const delTask = (id) => {
  return axios.delete(`/tutor/task/${id}`)
}

//------------------------获取论文列表
export const getPaper = (params) => {
  return axios.get(`/tutor/thesis`, {
    params
  })
}
//------------------------点评论文
export const appraise = (appraiseReq) => {
  return axios.post(`/tutor/appraise`,
    appraiseReq
  )
}
//------------------------查看论文
export const getAppraise = (id) => {
  return axios.get(`/tutor/appraise/${id}`, {
    params: {
      type: 2
    }
  })
}

//------------------------获取个人信息

export const getInfo = (id) => {
  return axios.get(`/tutor/info`)
}