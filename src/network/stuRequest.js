import { studentRequest } from './request';


//login
export function getStudentByName(loginName, studentPwd) {
  return studentRequest({
    url: '/student/login',
    method: 'post',
    data: {
      loginName,
      studentPwd
    }
  })
}