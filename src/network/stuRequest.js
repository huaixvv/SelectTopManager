import { studentRequest } from './request';


//login
export function getStudentByName(loginName, studentPwd) {
  return studentRequest({
    url: '/student/login',
    method: 'post',
    params: {
      loginName,
      studentPwd
    }
  })
}

//获取课题列表
export function getAllThesis(pageNum, pageSize=10) {
  return studentRequest({
    url: '/student/getAllThesis',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

//获取课题总数
export function getCountThesis() {
  return studentRequest({
    url: '/student/getCountThesis',
    method: 'get',
  })
}

//条件查询课题
export function getThesis(sisName, sisTeacher, sisCollege, pageNum, pageSize=5) {
  return studentRequest({
    url: '/student/getThesis',
    method: 'get',
    params: {
      sisName,
      sisTeacher,
      sisCollege,
      pageNum,
      pageSize
    }
  })
}


