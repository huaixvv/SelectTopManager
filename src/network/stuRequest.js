import { studentRequest } from './request';


//login
export function getStudentByName(loginName) {
  return studentRequest({
    url: '/student/login',
    params: {
      loginName
    }
  })
}