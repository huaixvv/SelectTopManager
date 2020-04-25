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

//申请课题
export function applyThesis(thesisVo) {
  return studentRequest({
    url: '/student/applyThesis',
    method:'post',
    params: {
      thesisVo,
      
    }
  })
}


//获取学生ge人信息
export function getStudent(studentId) {
  return studentRequest({
    url: '/student/getinfo',
    method:'get',
    params: {
      studentId,
    }
  })
}

//修改个人信息
export function editInfo(student) {
  return studentRequest({
    url: '/student/editinfo',
    method:'post',
    params: {
      student,
    }
  })
}

//选题
export function chooseThesis(thesis, studentId) {
  return studentRequest({
    url: '/student/choose',
    method: 'post',
    params: {
      thesis,
      studentId
    }
  })
}
