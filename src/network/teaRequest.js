import { teacherRequest } from './request';


//login
export function getTeacherByName(loginName, teacherPwd) {
  return teacherRequest({
    url: '/teacher/login',
    params: {
      loginName,
      teacherPwd
    }
  })
}