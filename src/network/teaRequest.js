import { teacherRequest } from './request';


//login
export function getTeacherByName(loginName, teacherPwd) {
  return teacherRequest({
    url: '/teacher/login',
    method:'post',
    params: {
      loginName,
      teacherPwd
    }
  })
}


//获取名下课题
export function getThesisByTeacherName(teacherName) {
  return teacherRequest({
    url: '/teacher/teacherThesis',
    method:'get',
    params: {
      teacherName,
    }
  })
}

//根据id获取课题
export function getThesisById(thesisId) {
  return teacherRequest({
    url: '/teacher/getThesis',
    method:'get',
    params: {
      thesisId,
    }
  })
}

//删除课题
export function delThesisById(thesisId) {
  return teacherRequest({
    url: '/teacher/delThesis',
    method:'get',
    params: {
      thesisId,
    }
  })
}

//新增课题
export function addThesis(thesisVo) {
  return teacherRequest({
    url: '/teacher/addThesis',
    method:'post',
    params: {
      thesisVo,
    }
  })
}


//修改课题
export function editThesis(thesisVo, thesisId) {
  return teacherRequest({
    url: '/teacher/editThesis',
    method:'post',
    params: {
      thesisVo,
      thesisId
    }
  })
}

//获取教师个人信息
export function getTeacher(teacherId) {
  return teacherRequest({
    url: '/teacher/getinfo',
    method:'get',
    params: {
      teacherId,
    }
  })
}

//修改个人信息
export function editinfo(teacher) {
  return teacherRequest({
    url: '/teacher/editinfo',
    method:'post',
    params: {
      teacher,
    }
  })
}