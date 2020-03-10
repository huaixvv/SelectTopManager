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
export function getThesisByTeacherId(teacherId) {
  return teacherRequest({
    url: '/teacher/teacherThesis',
    method:'get',
    params: {
      teacherId,
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